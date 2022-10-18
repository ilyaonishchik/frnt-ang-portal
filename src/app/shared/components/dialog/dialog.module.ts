import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'

import {DialogModule} from 'primeng/dialog'
import {ButtonModule} from 'primeng/button'
import {CheckboxModule} from 'primeng/checkbox'

import {DeleteComponent} from './delete/delete.component'
import {ActionComponent} from './action/action.component'
import {FormDirective} from '../../directives/form.directive'

@NgModule({
  declarations: [DeleteComponent, ActionComponent, FormDirective],
  exports: [DeleteComponent, ActionComponent, FormDirective],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
  ],
})
export class AvsDialogModule {}
