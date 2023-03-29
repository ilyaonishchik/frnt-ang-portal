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

import {IRole} from '@shared/interfaces/role.interface'
import {IPermission} from '@shared/interfaces/permission.interface'
import {allPermissionsSelector} from '@shared/store/selectors/session.selectors'

@Component({
  selector: 'app-role-form',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit, OnDestroy {
  @Input() readOnly = false
  @Input() initialValues!: IRole

  @Output() changeValues = new EventEmitter<IRole>()
  @Output() formValid = new EventEmitter<boolean>()

  private readonly unsubscribe$: Subject<void> = new Subject()

  sourcePermissions: IPermission[] = []
  targetPermissions: IPermission[] = []

  formRole!: FormGroup

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeSubscriptions()
    this.initializeForm()
  }

  private initializeValues(): void {
    this.targetPermissions.push(...this.initialValues.permissions)
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
      status: [this.initialValues.status],
    })
    this.onChangeValues()
  }

  onChangeValues(): void {
    this.onValidateForm()
    this.changePermissions()
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

  private finalizeSubscriptions(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  ngOnDestroy(): void {
    this.finalizeSubscriptions()
  }
}
