import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

import {Subscription} from 'rxjs'
import {select, Store} from '@ngrx/store'

import {IRole} from 'src/app/shared/interfaces/role.interface'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'
import {allPermissionsSelector} from '../../../../../auth/store/selectors'

@Component({
  selector: 'app-role-form',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit, OnDestroy {
  @Input('readOnly') readOnlyProps: boolean = false
  @Input('initialValues') initialValuesProps!: IRole

  @Output('changeValues') changeValuesEvent = new EventEmitter<IRole>()
  @Output('formValid') formValidEvent = new EventEmitter<boolean>()

  itemSubscription!: Subscription
  sourcePermissions: IPermission[] = []
  targetPermissions: IPermission[] = []

  formRole!: FormGroup
  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeForm()
  }

  private initializeForm(): void {
    this.formRole = this.fb.group({
      code: [this.initialValuesProps.code, [Validators.required]],
      name: [this.initialValuesProps.name, [Validators.required]],
      comment: [this.initialValuesProps.comment],
      permissions: [this.initialValuesProps.permissions],
      status: [this.initialValuesProps.status],
    })
    this.onChangeValues()
  }

  onChangeValues(): void {
    this.onValidateForm()
    this.changePermissions()
    this.changeValuesEvent.emit(this.formRole.value)
  }

  private onValidateForm(): void {
    this.formValidEvent.emit(this.formRole.valid)
  }

  get f() {
    return this.formRole.controls
  }

  initializeValues(): void {
    this.itemSubscription = this.store
      .pipe(select(allPermissionsSelector))
      .subscribe((items: IPermission[]) => {
        if (items) {
          //TODO Отсеять уже выбранные элементы
          this.sourcePermissions.push(...items)
        }
      })
    this.targetPermissions.push(...this.initialValuesProps.permissions)
  }

  ngOnDestroy(): void {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe()
    }
  }

  changePermissions(): void {
    this.formRole.value['permissions'] = this.targetPermissions
  }
}
