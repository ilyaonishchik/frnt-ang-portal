import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {AdminRoutingModule} from './admin-routing.module'

import {MainComponent} from './components/main/main.component'
import {SidebarComponent} from './components/sidebar/sidebar.component'

@NgModule({
  declarations: [MainComponent, SidebarComponent],
  imports: [CommonModule, AdminRoutingModule],
  exports: [SidebarComponent],
})
export class AdminModule {}
