import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {ButtonModule} from 'primeng/button'
import {TooltipModule} from 'primeng/tooltip'

import {StatusComponent} from './status/status.component'
import {ActionComponent} from './action/action.component'

@NgModule({
  declarations: [StatusComponent, ActionComponent],
  exports: [StatusComponent, ActionComponent],
  imports: [CommonModule, ButtonModule, TooltipModule],
})
export class ColumnsModule {}
