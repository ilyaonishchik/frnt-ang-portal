import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {WelcomeComponent} from './welcome/welcome.component'
import {DefaultComponent} from './default/default.component'

import {SignedInGuard} from '../../guards/signed-in.guard'

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {
    path: '',
    component: DefaultComponent,
    canActivate: [SignedInGuard],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
