import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'

import {IPermissionFull} from '@shared/interfaces/permission.interface'
import {IRole} from '@shared/interfaces/role.interface'
import {
  allRolesSelector,
  allUsersSelector,
} from '@shared/store/selectors/session.selectors'
import {Subject, takeUntil} from 'rxjs'
import {Store} from '@ngrx/store'
import {TCrudAction} from '@shared/types/crud-action.type'
import {IUser} from '@shared/interfaces/user.interface'

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
})
export class PermissionComponent implements OnInit, OnDestroy {
  @Input() readOnly = false
  @Input() crudAction: TCrudAction = TCrudAction.NONE
  @Input() initialValues!: IPermissionFull

  @Output() changeValues = new EventEmitter<IPermissionFull>()
  @Output() formValid = new EventEmitter<boolean>()

  private readonly unsubscribe$: Subject<void> = new Subject()

  formPermission!: FormGroup

  sourceRoles: IRole[] = []
  targetRoles: IRole[] = []

  sourceUsers: IUser[] = []
  targetUsers: IUser[] = []

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeParams()
    this.initializeSubscriptions()
    this.initializeForm()
  }

  private initializeParams(): void {
    this.targetRoles.push(...this.initialValues.roles)
    this.targetUsers.push(...this.initialValues.users)
  }

  private initializeSubscriptions(): void {
    this.store
      .select(allRolesSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((items: IRole[] | null) => {
        if (items) {
          this.sourceRoles = items.filter(
            (item) => !this.targetRoles.find((tr) => tr.id == item.id)
          )
        }
      })
    this.store
      .select(allUsersSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((items: IUser[] | null) => {
        if (items) {
          this.sourceUsers = items.filter(
            (item) => !this.targetUsers.find((tr) => tr.id == item.id)
          )
        }
      })
  }

  private initializeForm(): void {
    const form: any = {}

    form['code'] = new FormControl(this.initialValues.code, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ])
    form['name'] = new FormControl(this.initialValues.name, [
      Validators.required,
      Validators.maxLength(150),
    ])
    form['comment'] = new FormControl(this.initialValues.comment, [
      Validators.maxLength(200),
    ])
    form['roles'] = new FormControl(this.initialValues.roles)
    form['users'] = new FormControl(this.initialValues.users)
    form['status'] = new FormControl(this.initialValues.status)

    this.formPermission = this.fb.group(form)

    this.onChangeValues()
  }

  onChangeValues(): void {
    this.onValidateForm()
    this.changeRoles()
    this.changeUsers()
    this.changeValues.emit(this.formPermission.value)
  }

  onValidateForm(): void {
    this.formValid.emit(this.formPermission.valid)
  }

  changeRoles(): void {
    this.formPermission.value['roles'] = this.targetRoles
  }

  changeUsers(): void {
    this.formPermission.value['users'] = this.targetUsers
  }

  get f() {
    return this.formPermission.controls
  }

  private finalizeSubscriptions(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  ngOnDestroy(): void {
    this.finalizeSubscriptions()
  }
}
