import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'

import {SortirovkaRoutingModule} from './sortirovka-routing.module'
import {MainComponent} from './components/main/main.component'

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, SortirovkaRoutingModule, FormsModule],
})
export class SortirovkaModule {}
