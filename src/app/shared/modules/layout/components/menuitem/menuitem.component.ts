import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {animate, state, style, transition, trigger} from '@angular/animations'
import {NavigationEnd, Router} from '@angular/router'
import {filter, Subscription} from 'rxjs'

import {LayoutService} from '../../services/layout.service'
import {MenuService} from '../../services/menu.service'

@Component({
  selector: 'app-menuitem',
  templateUrl: './menuitem.component.html',
  styleUrls: ['./menuitem.component.scss'],
  // host: {
  //   '[class.layout-root-menuitem]': 'root',
  //   '[class.active-menuitem]': 'active',
  // },
  animations: [
    trigger('children', [
      state(
        'collapsed',
        style({
          height: '0',
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
        })
      ),
      transition(
        'collapsed <=> expanded',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
    ]),
  ],
})
export class MenuitemComponent implements OnInit, OnDestroy {
  @Input() item: any
  @Input() index!: number
  @Input() @HostBinding('class.layout-root-menuitem') root!: boolean
  @Input() parentKey!: string

  active = false
  key = ''
  menuSourceSubscription: Subscription
  menuResetSubscription: Subscription

  constructor(
    public layoutService: LayoutService,
    private cd: ChangeDetectorRef,
    public router: Router,
    private menuService: MenuService
  ) {
    this.menuSourceSubscription = this.menuService.menuSource$.subscribe(
      (value) => {
        Promise.resolve(null).then(() => {
          if (value.routeEvent) {
            this.active = !!(
              value.key === this.key || value.key.startsWith(this.key + '-')
            )
          } else {
            if (
              value.key !== this.key &&
              !value.key.startsWith(this.key + '-')
            ) {
              this.active = false
            }
          }
        })
      }
    )

    this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
      this.active = false
    })

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.item.routerLink) {
          this.updateActiveStateFromRoute()
        }
      })
  }

  ngOnInit(): void {
    this.key = this.parentKey
      ? this.parentKey + '-' + this.index
      : String(this.index)

    if (this.item.routerLink) {
      this.updateActiveStateFromRoute()
    }
  }

  updateActiveStateFromRoute(): void {
    const activeRoute = this.router.isActive(this.item.routerLink[0], {
      paths: 'exact',
      queryParams: 'ignored',
      matrixParams: 'ignored',
      fragment: 'ignored',
    })

    if (activeRoute) {
      this.menuService.onMenuStateChange({key: this.key, routeEvent: true})
    }
  }

  itemClick(event: Event) {
    // avoid processing disabled items
    if (this.item.disabled) {
      event.preventDefault()
      return
    }

    // execute command
    if (this.item.command) {
      this.item.command({originalEvent: event, item: this.item})
    }

    // toggle active state
    if (this.item.items) {
      this.active = !this.active
    }

    this.menuService.onMenuStateChange({key: this.key})
  }

  get submenuAnimation() {
    return this.root ? 'expanded' : this.active ? 'expanded' : 'collapsed'
  }

  @HostBinding('class.active-menuitem')
  get activeClass() {
    return this.active && !this.root
  }

  ngOnDestroy(): void {
    if (this.menuSourceSubscription) {
      this.menuSourceSubscription.unsubscribe()
    }

    if (this.menuResetSubscription) {
      this.menuResetSubscription.unsubscribe()
    }
  }
}
