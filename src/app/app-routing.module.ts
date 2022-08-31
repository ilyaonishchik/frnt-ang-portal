import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {AppLayoutComponent} from './layout/app.layout.component'

// import {AuthGuard} from './guards/auth.guard'

// import {WelcomeComponent} from './components/welcome/welcome.component'

const routes: Routes = [
  // {
  //     path: 'default',
  //     canActivate: [AuthGuard],
  //     loadChildren: () =>
  //       import('./modules/default/default.module').then((m) => m.DefaultModule),
  //   },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
  },
  //   {
  //     path: 'admin',
  //     canActivate: [AuthGuard],
  //     // canDeactivate: [AuthGuard],
  //     loadChildren: () =>
  //       import('./modules/admin/admin.module').then((m) => m.AdminModule),
  //   },
  //   {
  //     path: 'sorting',
  //     loadChildren: () =>
  //       import('./modules/sorting/sorting.module').then((m) => m.SortingModule),
  //   },
  //   {
  //     path: 'sortirovka',
  //     loadChildren: () =>
  //       import('./modules/sortirovka/sortirovka.module').then(
  //         (m) => m.SortirovkaModule
  //       ),
  //   },
  //   {
  //     path: 'welcome',
  //     component: WelcomeComponent,
  //   },
  //   {path: '', redirectTo: 'default', pathMatch: 'full'},
  {path: '', component: AppLayoutComponent},
  {path: '**', redirectTo: 'error', pathMatch: 'full'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
