import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import {StorageService} from '@shared/services/storage.service'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {HttpEvent, HttpEventType} from '@angular/common/http'
import {FileUpload} from 'primeng/fileupload'

@Component({
  selector: 'avs-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('fileUpload') fileUpload!: FileUpload
  @Input() visible = false
  @Output() visibleChange = new EventEmitter<boolean>()
  @Output() uploaded = new EventEmitter<boolean>()
  @Input() category = '0'

  form!: FormGroup
  progress = -1

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
    this.cancelUploading()
    this.visibleChange.emit(value)
  }

  uploadFile(event: any): void {
    if (!this.fileUpload.disabled) {
      this.fileUpload.disabled = true
      this.progress = 0
      this.storageService
        .uploadFile(event.files[0], this.category, this.form.value.file_desc)
        .subscribe({
          next: (event: HttpEvent<any>) => {
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
                }
                break
              case HttpEventType.Response:
                // console.log('File successfully uploaded!')
                setTimeout(() => {
                  this.progress = -1
                  this.fileUpload.clear()
                  this.onVisibleChange(false)
                  this.onUpload()
                }, 500)
            }
          },
          error: () => {
            this.progress = -1
            this.fileUpload.clear()
            this.onVisibleChange(false)
          },
          complete: () => {
            console.log('Complete uploading file.')
          },
        })
    }
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

  cancelUploading() {
    if (this.progress > -1) {
      this.storageService.cancelUploading()
    }
    this.fileUpload.disabled = false
    this.progress = -1
  }

  ngOnChanges(): void {
    this.progress = -1
  }

  ngOnDestroy(): void {
    this.cancelUploading()
  }
}
