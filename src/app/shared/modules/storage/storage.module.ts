import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {UploadFileComponent} from './components/upload-file/upload-file.component'
import {DialogModule} from 'primeng/dialog'
import {ButtonModule} from 'primeng/button'
import {FileUploadModule} from 'primeng/fileupload'
import {ReactiveFormsModule} from '@angular/forms'
import {PipesModule} from '@shared/modules/pipes/pipes.module'
import {InputTextareaModule} from 'primeng/inputtextarea'
import {ValidateModule} from '@shared/modules/validate/validate.module'

@NgModule({
  declarations: [UploadFileComponent],
  exports: [UploadFileComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    FileUploadModule,
    ReactiveFormsModule,
    PipesModule,
    InputTextareaModule,
    ValidateModule,
  ],
})
export class StorageModule {}
