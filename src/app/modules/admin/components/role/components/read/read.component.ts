import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import {Observable, Subscription} from 'rxjs'
import {select, Store} from '@ngrx/store'

import {IRole} from 'src/app/shared/interfaces/role.interface'
import {isLoadingSelector, roleSelector} from '../../store/selectors'
import {getRoleAction} from '../../store/actions/role.action'

@Component({
  selector: 'app-role-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit, OnDestroy {
  @Input('visible') visible: boolean = false
  @Output('visibleChange') visibleChange = new EventEmitter<boolean>()
  @Input('itemId') itemId!: number

  item!: IRole
  itemSubscription!: Subscription

  isLoading$!: Observable<boolean>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
    this.initializeListeners()
  }

  private initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
  }

  private fetchData(): void {
    this.store.dispatch(getRoleAction({id: this.itemId}))
  }

  private initializeListeners() {
    this.itemSubscription = this.store
      .pipe(select(roleSelector))
      .subscribe((role: IRole | null) => {
        if (role) {
          this.item = role
        }
      })
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  ngOnDestroy() {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe()
    }
  }
}
