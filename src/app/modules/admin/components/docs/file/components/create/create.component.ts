import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {IFile} from '@modules/admin/sections/docs/files/interfaces/file.interface'
import {Observable} from 'rxjs'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {Store} from '@ngrx/store'
import {errorsSelector} from '@modules/admin/components/docs/file/store/selectors'
import {createFileAction} from '@modules/admin/components/docs/file/store/actions/file.action'

@Component({
  selector: 'app-file-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @Input() visible = false
  @Input() subjectName = ''

  @Output() visibleChange = new EventEmitter<boolean>()

  validationErrors$!: Observable<IBackendErrors | null>

  item!: IFile
  formValid = false
  statusItem = true

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeSubscriptions()
  }

  private initializeValues(): void {
    this.item = {
      id: 0,
      file_name: '',
      file_type: '',
      file_desc: null,
      file_ext: null,
      file_size: 0,
      downloads: 0,
      status: true,
    }
  }

  private initializeSubscriptions(): void {
    this.validationErrors$ = this.store.select(errorsSelector)
  }

  saveItem(): void {
    if (this.formValid) {
      this.store.dispatch(createFileAction({file: this.item}))
    }
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  onValidate(valid: boolean): void {
    this.formValid = valid
  }

  changeItem(value: IFile): void {
    this.item = {...value, status: this.statusItem}
  }

  changeStatus(event: boolean): void {
    this.statusItem = event
  }
}
