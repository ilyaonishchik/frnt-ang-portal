import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import {StorageService} from '@shared/services/storage.service'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {HttpEvent, HttpEventType} from '@angular/common/http'

@Component({
  selector: 'avs-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: any
  @Input() visible = false
  @Output() visibleChange = new EventEmitter<boolean>()
  @Output() uploaded = new EventEmitter<boolean>()
  @Input() category = '0'

  form!: FormGroup
  progress = 0

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      file_desc: ['', Validators.maxLength(255)],
    })
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    if (!this.visible) {
      this.form.reset()
    }
    this.visibleChange.emit(value)
  }

  uploadFile(event: any): void {
    this.fileUpload.disable = true
    this.storageService
      .uploadFile(event.files[0], this.category, this.form.value.file_desc)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          // case HttpEventType.Sent:
          //   console.log('Request has been made!')
          //   break
          // case HttpEventType.ResponseHeader:
          //   console.log('Response header has been received!')
          //   break
          case HttpEventType.UploadProgress:
            if (event.total) {
              this.progress = Math.round((event.loaded / event.total) * 100)
              console.log(this.progress)
            }
            break
          case HttpEventType.Response:
            // console.log('File successfully created!', event.body)
            console.log('File successfully uploaded!')
            setTimeout(() => {
              this.progress = 0
              this.fileUpload.clear()
              this.onVisibleChange(false)
              this.onUpload()
            }, 1000)
        }
      })
  }

  // submitFile(): void {
  //   this.storageService
  //     .uploadFile(this.form.value.file_body, this.form.value.category)
  //     .subscribe((event: HttpEvent<any>) => {
  //       switch (event.type) {
  //         case HttpEventType.Sent:
  //           console.log('Request has been made!')
  //           break
  //         case HttpEventType.ResponseHeader:
  //           console.log('Response header has been received!')
  //           break
  //         case HttpEventType.UploadProgress:
  //           if (event.total) {
  //             this.progress = Math.round((event.loaded / event.total) * 100)
  //             console.log(`Uploaded! ${this.progress}%`)
  //           }
  //           break
  //         case HttpEventType.Response:
  //           console.log('User successfully created!', event.body)
  //           setTimeout(() => {
  //             this.progress = 0
  //           }, 1500)
  //       }
  //     })
  // }

  onUpload(): void {
    this.uploaded.emit(true)
  }

  get f() {
    return this.form.controls
  }
}
