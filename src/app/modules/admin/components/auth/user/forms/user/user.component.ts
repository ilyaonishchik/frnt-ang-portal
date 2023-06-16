import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import {Store} from '@ngrx/store'
import {Subject, takeUntil} from 'rxjs'

import {IUserFull} from '@shared/interfaces/user.interface'
import {IPermission} from '@shared/interfaces/permission.interface'
import {IRole} from '@shared/interfaces/role.interface'
import {
  allPermissionsSelector,
  allRolesSelector,
} from '@shared/store/selectors/session.selectors'
import {SelectItem} from 'primeng/api'
import {TCrudAction} from '@shared/types/crud-action.type'
import {CustomValidators} from '@shared/validators/custom'

@Component({
  selector: 'app-user-form',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  @Input() readOnly = false
  @Input() crudAction: TCrudAction = TCrudAction.NONE
  @Input() initialValues!: IUserFull

  @Output() changeValues = new EventEmitter<IUserFull>()
  @Output() formValid = new EventEmitter<boolean>()

  formUser!: FormGroup
  subdivisions: SelectItem[] = []

  private readonly unsubscribe$: Subject<void> = new Subject()

  sourceRoles: IRole[] = []
  targetRoles: IRole[] = []
  sourcePermissions: IPermission[] = []
  targetPermissions: IPermission[] = []

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeParams()
    this.initializeSubscriptions()
    this.initializeForm()
  }

  private initializeParams(): void {
    this.subdivisions = [
      {label: 'Не указано', value: null},
      {label: 'Берестовица УПС', value: 1},
      {label: 'Волковыск РУПС', value: 2},
      {label: 'Вороново УПС', value: 3},
      {label: 'Гродно ОЦПС', value: 4},
      {label: 'Дятлово УПС', value: 5},
      {label: 'Зельва УПС', value: 6},
      {label: 'Ивье УПС', value: 7},
      {label: 'Кореличи УПС', value: 8},
      {label: 'Лида РУПС', value: 9},
      {label: 'Мосты УПС', value: 10},
      {label: 'Новогрудок УПС', value: 11},
      {label: 'Островец УПС', value: 12},
      {label: 'Ошмяны УПС', value: 13},
      {label: 'Слоним УПС', value: 14},
      {label: 'Свислочь УПС', value: 15},
      {label: 'Сморгонь РУПС', value: 16},
      {label: 'Щучин УПС', value: 17},
      {label: 'Гродно РУПС', value: 18},
    ]
    this.targetRoles.push(...this.initialValues.roles)
    this.targetPermissions.push(...this.initialValues.permissions)
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
      .select(allPermissionsSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((items: IPermission[] | null) => {
        if (items) {
          this.sourcePermissions = items.filter(
            (item) => !this.targetPermissions.find((tp) => tp.id == item.id)
          )
        }
      })
  }

  private initializeForm(): void {
    const form: any = {}
    let custom_validators: ValidatorFn | ValidatorFn[] | null = null

    form['username'] = new FormControl(this.initialValues.username, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ])
    form['email'] = new FormControl(this.initialValues.email, [
      Validators.email,
    ])
    form['avatar'] = new FormControl(this.initialValues.avatar)
    form['comment'] = new FormControl(this.initialValues.comment, [
      Validators.maxLength(200),
    ])
    form['sd_id'] = new FormControl(this.initialValues.sd_id)
    form['roles'] = new FormControl(this.initialValues.roles)
    form['permissions'] = new FormControl(this.initialValues.permissions)
    form['status'] = new FormControl(this.initialValues.status)

    if (this.crudAction === TCrudAction.CREATE) {
      form['password'] = new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(60),
      ])
      form['password2'] = new FormControl(null, [Validators.required])
      custom_validators = [CustomValidators.mustMatch('password', 'password2')]
    }

    this.formUser = this.fb.group(form, {validators: custom_validators})

    this.onChangeValues()
  }

  onChangeValues(): void {
    this.onValidateForm()
    this.changeRoles()
    this.changePermissions()
    this.changeValues.emit(this.formUser.value)
  }

  onValidateForm(): void {
    this.formValid.emit(this.formUser.valid)
  }

  changeRoles(): void {
    this.formUser.value['roles'] = this.targetRoles
  }

  changePermissions(): void {
    this.formUser.value['permissions'] = this.targetPermissions
  }

  get f() {
    return this.formUser.controls
  }

  private finalizeSubscriptions(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  ngOnDestroy(): void {
    this.finalizeSubscriptions()
  }
}
