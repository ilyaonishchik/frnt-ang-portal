import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DeleteComponent} from './delete/delete.component'
import {DialogModule} from 'primeng/dialog'
import {ButtonModule} from 'primeng/button'

@NgModule({
  declarations: [DeleteComponent],
  exports: [DeleteComponent],
  imports: [CommonModule, DialogModule, ButtonModule],
})
export class AvsDialogModule {}
