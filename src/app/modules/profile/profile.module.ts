import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {ProfileRoutingModule} from './profile-routing.module'
import {MainComponent} from './components/main/main.component'
import {AvatarModule} from 'primeng/avatar'
import {InputTextModule} from 'primeng/inputtext'

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, ProfileRoutingModule, AvatarModule, InputTextModule],
  exports: [MainComponent],
})
export class ProfileModule {}
