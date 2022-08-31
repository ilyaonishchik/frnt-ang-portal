import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {Page404Component} from './components/page404/page404.component'
import {Page403Component} from './components/page403/page403.component'
import {Page500Component} from './components/page500/page500.component'

const routes: Routes = [
  {path: '403', component: Page403Component},
  {path: '404', component: Page404Component},
  {path: '500', component: Page500Component},
  {path: '', redirectTo: '404', pathMatch: 'full'},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorsRoutingModule {}
