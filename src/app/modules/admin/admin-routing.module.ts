import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {MainComponent} from './components/main/main.component'
import {DashboardComponent} from './components/dashboard/dashboard.component'
import {UsersComponent} from './components/users/users.component'

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'users', component: UsersComponent},
  // {path: '**', redirectTo: 'main', pathMatch: 'full'},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
