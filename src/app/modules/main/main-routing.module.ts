import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {WelcomeComponent} from './welcome/welcome.component'
import {DefaultComponent} from './default/default.component'

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'default', component: DefaultComponent},
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
