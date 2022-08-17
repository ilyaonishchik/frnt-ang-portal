import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {AuthGuard} from './guards/auth.guard'

import {Page404Component} from './components/page404/page404.component'
import {WelcomeComponent} from './components/welcome/welcome.component'

const routes: Routes = [
  {
    path: 'default',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/default/default.module').then((m) => m.DefaultModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    // canDeactivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'sorting',
    loadChildren: () =>
      import('./modules/sorting/sorting.module').then((m) => m.SortingModule),
  },
  {
    path: 'sortirovka',
    loadChildren: () =>
      import('./modules/sortirovka/sortirovka.module').then(
        (m) => m.SortirovkaModule
      ),
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {path: '', redirectTo: 'default', pathMatch: 'full'},
  {path: '**', component: Page404Component},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
