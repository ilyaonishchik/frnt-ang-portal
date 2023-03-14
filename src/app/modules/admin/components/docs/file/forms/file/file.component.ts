import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {IFile} from '@modules/admin/sections/docs/files/interfaces/file.interface'

@Component({
  selector: 'app-file-form',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {
  @Input() readOnly = false
  @Input() initialValues!: IFile

  @Output() changeValues = new EventEmitter<IFile>()
  @Output() formValid = new EventEmitter<boolean>()

  formFile!: FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  private initializeForm(): void {
    this.formFile = this.fb.group({
      file_name: [
        this.initialValues.file_name,
        [Validators.required, Validators.maxLength(255)],
      ],
      file_desc: [this.initialValues.file_desc, [Validators.maxLength(255)]],
      // file_type: [this.initialValues.file_type, [Validators.required]],
      // file_ext: [this.initialValues.file_ext],
      // file_size: [this.initialValues.file_size],
      // downloads: [this.initialValues.downloads],
      status: [this.initialValues.status],
    })
    this.onChangeValues()
  }

  onChangeValues(): void {
    this.onValidateForm()
    this.changeValues.emit(this.formFile.value)
  }

  private onValidateForm(): void {
    this.formValid.emit(this.formFile.valid)
  }

  get f() {
    return this.formFile.controls
  }
}
