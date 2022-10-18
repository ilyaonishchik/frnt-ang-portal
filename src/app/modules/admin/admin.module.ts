import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {AdminRoutingModule} from './admin-routing.module'
import {MainComponent} from './components/main/main.component'
import {DashboardComponent} from './components/dashboard/dashboard.component'

@NgModule({
  declarations: [MainComponent, DashboardComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
