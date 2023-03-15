import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DialogComponent} from './components/dialog/dialog.component'
import {DialogModule} from 'primeng/dialog'
import {CheckboxModule} from 'primeng/checkbox'
import {ButtonModule} from 'primeng/button'
import {ValidateModule} from '@shared/modules/validate/validate.module'
import {LoadingModule} from '@shared/modules/loading/loading.module'
import {FormsModule} from '@angular/forms'

@NgModule({
  declarations: [DialogComponent],
  imports: [
    CommonModule,
    DialogModule,
    CheckboxModule,
    ButtonModule,
    ValidateModule,
    LoadingModule,
    FormsModule,
  ],
  exports: [DialogComponent],
})
export class ModalDialogModule {}
