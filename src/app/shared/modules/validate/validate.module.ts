import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MessagesModule} from 'primeng/messages'

import {InputComponent} from './components/input/input.component'
import {ErrorsComponent} from './components/errors/errors.component'

@NgModule({
  declarations: [InputComponent, ErrorsComponent],
  imports: [CommonModule, MessagesModule],
  exports: [InputComponent, ErrorsComponent],
})
export class ValidateModule {}
