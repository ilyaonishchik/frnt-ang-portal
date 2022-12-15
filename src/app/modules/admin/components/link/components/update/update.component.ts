import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable, Subscription} from 'rxjs'

import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {ILink} from '../../../../sections/portal/links/interfaces/link.interface'
import {
  errorsSelector,
  isLoadingSelector,
  linkSelector,
} from '../../store/selectors'
import {getLinkAction, updateLinkAction} from '../../store/actions/link.action'

@Component({
  selector: 'app-link-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit, OnDestroy {
  @Input() visible = false
  @Output() visibleChange = new EventEmitter<boolean>()
  @Input() itemId!: number

  item!: ILink
  itemSubscription!: Subscription

  isLoading$!: Observable<boolean>
  validationErrors$!: Observable<IBackendErrors | null>
  formValid = false
  statusItem = false

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
    this.initializeListeners()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.validationErrors$ = this.store.select(errorsSelector)
  }

  initializeListeners(): void {
    this.itemSubscription = this.store
      .select(linkSelector)
      .subscribe((item: ILink | null) => {
        if (item) {
          this.item = {...item}
          this.statusItem = item.status
        }
      })
  }

  fetchData(): void {
    this.store.dispatch(getLinkAction({id: this.itemId}))
  }

  saveItem(): void {
    if (this.formValid) {
      this.store.dispatch(updateLinkAction({id: this.itemId, link: this.item}))
    }
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  onValidate(valid: boolean): void {
    this.formValid = valid
  }

  changeItem(value: ILink): void {
    this.item = {...value, status: this.statusItem}
  }

  ngOnDestroy(): void {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe()
    }
  }

  changeStatus(event: boolean) {
    this.statusItem = event
  }
}
