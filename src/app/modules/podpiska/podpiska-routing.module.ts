import {inject, NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {MainComponent} from './components/main/main.component'
import {AuthService} from '@modules/auth/services/auth.service'

const routes: Routes = [
  {path: '', component: MainComponent},
  {
    path: 'sorting',
    canActivate: [
      () => inject(AuthService).checkPermission('front:podpiska:sorting'),
    ],
    loadChildren: () =>
      import('./modules/sorting/sorting.module').then((m) => m.SortingModule),
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PodpiskaRoutingModule {}
