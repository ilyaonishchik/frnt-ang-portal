import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {Page404Component} from './components/page404/page404.component'

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {path: '**', component: Page404Component},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
