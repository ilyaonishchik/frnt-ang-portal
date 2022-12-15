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
import {Store} from '@ngrx/store'

import {IRole} from '@shared/interfaces/role.interface'
import {IPermission} from '@shared/interfaces/permission.interface'
import {allPermissionsSelector} from '@shared/store/selectors/session.selectors'

@Component({
  selector: 'app-role-form',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit, OnDestroy {
  @Input('readOnly') readOnlyProps = false
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
      code: [
        this.initialValuesProps.code,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      name: [
        this.initialValuesProps.name,
        [Validators.required, Validators.maxLength(150)],
      ],
      comment: [this.initialValuesProps.comment, [Validators.maxLength(200)]],
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

  onValidateForm(): void {
    this.formValidEvent.emit(this.formRole.valid)
  }

  get f() {
    return this.formRole.controls
  }

  private initializeValues(): void {
    this.targetPermissions.push(...this.initialValuesProps.permissions)
    this.itemSubscription = this.store
      .select(allPermissionsSelector)
      .subscribe((items: IPermission[] | null) => {
        if (items) {
          this.sourcePermissions = items.filter(
            (item) => !this.targetPermissions.find((tp) => tp.id == item.id)
          )
        }
      })
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
