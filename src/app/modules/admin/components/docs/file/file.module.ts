import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CreateComponent} from './components/create/create.component'
import {DeleteComponent} from './components/delete/delete.component'
import {ReadComponent} from './components/read/read.component'
import {UpdateComponent} from './components/update/update.component'
import {FileComponent} from './forms/file/file.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {InputTextModule} from 'primeng/inputtext'
import {ValidateModule} from '@shared/modules/validate/validate.module'
import {DialogModule} from 'primeng/dialog'
import {LoadingModule} from '@shared/modules/loading/loading.module'
import {CheckboxModule} from 'primeng/checkbox'
import {ButtonModule} from 'primeng/button'
import {StoreModule} from '@ngrx/store'
import {
  fileFeatureKey,
  reducerFile,
} from '@modules/admin/components/docs/file/store/reducers'
import {EffectsModule} from '@ngrx/effects'
import {CreateFileEffect} from '@modules/admin/components/docs/file/store/effects/create-file.effect'
import {ReadFileEffect} from '@modules/admin/components/docs/file/store/effects/read-file.effect'
import {UpdateFileEffect} from '@modules/admin/components/docs/file/store/effects/update-file.effect'
import {DeleteFileEffect} from '@modules/admin/components/docs/file/store/effects/delete-file.effect'
import {InputTextareaModule} from 'primeng/inputtextarea'

@NgModule({
  declarations: [
    CreateComponent,
    DeleteComponent,
    ReadComponent,
    UpdateComponent,
    FileComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fileFeatureKey, reducerFile),
    EffectsModule.forFeature([
      CreateFileEffect,
      ReadFileEffect,
      UpdateFileEffect,
      DeleteFileEffect,
    ]),
    ReactiveFormsModule,
    InputTextModule,
    ValidateModule,
    DialogModule,
    LoadingModule,
    CheckboxModule,
    FormsModule,
    ButtonModule,
    InputTextareaModule,
  ],
  exports: [ReadComponent, CreateComponent, UpdateComponent, DeleteComponent],
})
export class FileModule {}
