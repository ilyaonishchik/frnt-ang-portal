import {
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import {FormDirective} from '../../../directives/form.directive'
import {IFormInitialValues} from '../../../interfaces/form-initial-values.interface'
import {FormValuesComponent} from '../../../classes/form.class'
import {UserComponent} from '../../../../modules/admin/components/user/forms/user/user.component'

@Component({
  selector: 'avs-dialog-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent implements OnInit {
  @Input('visible') visible: boolean = false
  @Output('visibleChange') visibleChange: EventEmitter<boolean> =
    new EventEmitter<boolean>()

  @Input('header') header: string = 'Информация о: '
  @Input('actionRead') actionRead: boolean = false

  @Input('status') status: number = 0
  @Output('statusChange') statusChange: EventEmitter<number> =
    new EventEmitter<number>()

  @Output('clickConfirm') onClickConfirm: EventEmitter<any> =
    new EventEmitter<any>()
  @Output('clickCancel') onClickCancel: EventEmitter<any> =
    new EventEmitter<any>()

  // @Input('itemForm') itemForm!: FormItem
  // @ViewChild(FormDirective, {static: true}) appForm!: FormDirective
  @ViewChild('dynamic', {read: ViewContainerRef})
  private dynamic!: ViewContainerRef
  private componentRef!: ComponentRef<UserComponent>

  constructor() {}

  ngOnInit(): void {
    this.loadComponent()
  }

  loadComponent(): void {
    // const viewContainerRef = this.appForm.viewContainerRef
    // viewContainerRef.clear()
    // const componentRef = viewContainerRef.createComponent<IFormComponent>(
    //   this.itemForm.component
    // )
    // console.log(this.itemForm.data)
    // componentRef.instance.data = this.itemForm.data
    // this.dynamic.clear()
    this.componentRef = this.dynamic.createComponent(UserComponent)
    console.log(this.componentRef)
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  onStatusChange(value: number): void {
    this.status = value
    this.statusChange.emit(value)
  }

  hideDialog(): void {
    this.dynamic.clear()
    this.visible = false
    this.onClickCancel.emit()
  }

  saveItem(): void {
    this.onClickConfirm.emit()
  }
}
