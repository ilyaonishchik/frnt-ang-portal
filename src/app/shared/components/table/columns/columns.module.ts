import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {StatusComponent} from './status/status.component'
import {ActionComponent} from './action/action.component'
import {ButtonModule} from 'primeng/button'
import {TooltipModule} from 'primeng/tooltip'

@NgModule({
  declarations: [StatusComponent, ActionComponent],
  exports: [StatusComponent, ActionComponent],
  imports: [CommonModule, ButtonModule, TooltipModule],
})
export class ColumnsModule {}
