import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ValidateComponent} from './components/validate/validate.component'

@NgModule({
  declarations: [ValidateComponent],
  exports: [ValidateComponent],
  imports: [CommonModule],
})
export class ErrorsModule {}
