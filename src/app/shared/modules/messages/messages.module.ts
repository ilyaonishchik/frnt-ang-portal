import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ValidateComponent} from './components/validate/validate.component'
import {MessagesModule as PrimeMessagesModule} from 'primeng/messages'

@NgModule({
  declarations: [ValidateComponent],
  exports: [ValidateComponent],
  imports: [CommonModule, PrimeMessagesModule],
})
export class MessagesModule {}
