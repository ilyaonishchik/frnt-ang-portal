import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {Subscription} from 'rxjs'

import {IUser} from '@shared/interfaces/user.interface'
import {IPermission} from '@shared/interfaces/permission.interface'
import {IRole} from '@shared/interfaces/role.interface'
import {
  allPermissionsSelector,
  allRolesSelector,
} from '@shared/store/selectors/session.selectors'
// import {StorageService} from '@shared/services/storage.service'

@Component({
  selector: 'app-user-form',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  @Input('isReadOnly') isReadOnlyProps = false
  @Input('initialValues') initialValuesProps!: IUser

  @Output('changeValues') changeValuesEvent = new EventEmitter<IUser>()
  @Output('formValid') formValidEvent = new EventEmitter<boolean>()

  formUser!: FormGroup

  itemSubscriptionR!: Subscription
  itemSubscriptionP!: Subscription
  sourceRoles: IRole[] = []
  sourcePermissions: IPermission[] = []
  targetRoles: IRole[] = []
  targetPermissions: IPermission[] = []

  constructor(
    private fb: FormBuilder,
    private store: Store // private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeForm()
  }

  private initializeValues(): void {
    this.targetRoles.push(...this.initialValuesProps.roles)
    this.targetPermissions.push(...this.initialValuesProps.permissions)

    this.itemSubscriptionR = this.store
      .select(allRolesSelector)
      .subscribe((items: IRole[] | null) => {
        if (items) {
          this.sourceRoles = items.filter(
            (item) => !this.targetRoles.find((tr) => tr.id == item.id)
          )
        }
      })

    this.itemSubscriptionP = this.store
      .select(allPermissionsSelector)
      .subscribe((items: IPermission[] | null) => {
        if (items) {
          this.sourcePermissions = items.filter(
            (item) => !this.targetPermissions.find((tp) => tp.id == item.id)
          )
        }
      })
  }

  private initializeForm(): void {
    this.formUser = this.fb.group({
      username: [
        this.initialValuesProps.username,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      email: [this.initialValuesProps.email, [Validators.email]],
      avatar: [this.initialValuesProps.avatar],
      comment: [this.initialValuesProps.comment, [Validators.maxLength(200)]],
      sd_id: [this.initialValuesProps.sd_id, [Validators.min(1)]],
      roles: [this.initialValuesProps.roles],
      permissions: [this.initialValuesProps.permissions],
      status: [this.initialValuesProps.status],
    })
    this.onChangeValues()
  }

  onChangeValues(): void {
    this.onValidateForm()
    this.changeRoles()
    this.changePermissions()
    this.changeValuesEvent.emit(this.formUser.value)
  }

  get f() {
    return this.formUser.controls
  }

  onValidateForm(): void {
    this.formValidEvent.emit(this.formUser.valid)
  }

  changeRoles(): void {
    this.formUser.value['roles'] = this.targetRoles
  }

  changePermissions(): void {
    this.formUser.value['permissions'] = this.targetPermissions
  }

  ngOnDestroy(): void {
    if (this.itemSubscriptionR) {
      this.itemSubscriptionR.unsubscribe()
    }
    if (this.itemSubscriptionP) {
      this.itemSubscriptionP.unsubscribe()
    }
  }

  // uploadFile(event: any): void {
  //   console.log(event.files)
  //   for (let file of event.files) {
  //     this.storage.uploadFile(file).subscribe(
  //       (data) => {
  //         console.log(data)
  //       },
  //       (error) => {
  //         console.log(error)
  //       }
  //     )
  //   }
  // }
}
