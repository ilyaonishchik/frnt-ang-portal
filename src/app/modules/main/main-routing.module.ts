import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {SignedInGuard} from '@guards/signed-in.guard'
import {WelcomeComponent} from './components/welcome/welcome.component'
import {DefaultComponent} from './components/default/default.component'

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {
    path: '',
    component: DefaultComponent,
    canActivate: [SignedInGuard],
    // canActivate: [() => inject(AuthService).isSignedIn()],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
