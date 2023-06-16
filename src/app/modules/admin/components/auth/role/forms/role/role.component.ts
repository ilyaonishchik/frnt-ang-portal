import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

import {Subject, takeUntil} from 'rxjs'
import {Store} from '@ngrx/store'

import {IRoleFull} from '@shared/interfaces/role.interface'
import {IPermission} from '@shared/interfaces/permission.interface'
import {
  allPermissionsSelector,
  allUsersSelector,
} from '@shared/store/selectors/session.selectors'
import {IUser} from '@shared/interfaces/user.interface'
import {TCrudAction} from '@shared/types/crud-action.type'

@Component({
  selector: 'app-role-form',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit, OnDestroy {
  @Input() readOnly = false
  @Input() crudAction: TCrudAction = TCrudAction.NONE
  @Input() initialValues!: IRoleFull

  @Output() changeValues = new EventEmitter<IRoleFull>()
  @Output() formValid = new EventEmitter<boolean>()

  private readonly unsubscribe$: Subject<void> = new Subject()

  sourcePermissions: IPermission[] = []
  targetPermissions: IPermission[] = []

  sourceUsers: IUser[] = []
  targetUsers: IUser[] = []

  formRole!: FormGroup

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeSubscriptions()
    this.initializeForm()
  }

  private initializeValues(): void {
    this.targetPermissions.push(...this.initialValues.permissions)
    this.targetUsers.push(...this.initialValues.users)
  }

  private initializeSubscriptions(): void {
    this.store
      .select(allPermissionsSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((items: IPermission[] | null) => {
        if (items) {
          this.sourcePermissions = items.filter(
            (item) => !this.targetPermissions.find((tp) => tp.id == item.id)
          )
        }
      })
    this.store
      .select(allUsersSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((items: IUser[] | null) => {
        if (items) {
          this.sourceUsers = items.filter(
            (item) => !this.targetUsers.find((tp) => tp.id == item.id)
          )
        }
      })
  }

  private initializeForm(): void {
    this.formRole = this.fb.group({
      code: [
        this.initialValues.code,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      name: [
        this.initialValues.name,
        [Validators.required, Validators.maxLength(150)],
      ],
      comment: [this.initialValues.comment, [Validators.maxLength(200)]],
      permissions: [this.initialValues.permissions],
      users: [this.initialValues.users],
      status: [this.initialValues.status],
    })
    this.onChangeValues()
  }

  onChangeValues(): void {
    this.onValidateForm()
    this.changePermissions()
    this.changeUsers()
    this.changeValues.emit(this.formRole.value)
  }

  onValidateForm(): void {
    this.formValid.emit(this.formRole.valid)
  }

  get f() {
    return this.formRole.controls
  }

  changePermissions(): void {
    this.formRole.value['permissions'] = this.targetPermissions
  }

  changeUsers(): void {
    this.formRole.value['users'] = this.targetUsers
  }

  private finalizeSubscriptions(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  ngOnDestroy(): void {
    this.finalizeSubscriptions()
  }
}
