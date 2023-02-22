import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {MainComponent} from './components/main/main.component'
import {PermissionGuard} from '@guards/permission.guard'
import {SignedInGuard} from '@guards/signed-in.guard'

const routes: Routes = [
  {path: '', component: MainComponent},
  {
    path: 'sorting',
    canActivate: [SignedInGuard, PermissionGuard],
    data: {permission: 'podpiska:sorting'},
    loadChildren: () =>
      import('./modules/sorting/sorting.module').then((m) => m.SortingModule),
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PodpiskaRoutingModule {}
