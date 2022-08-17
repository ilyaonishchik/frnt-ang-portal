import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {PdpComponent} from './components/pdp/pdp.component'
import {RznComponent} from './components/rzn/rzn.component'

const routes: Routes = [
  {
    path: 'pdp',
    component: PdpComponent,
    pathMatch: 'full',
  },
  {
    path: 'rzn',
    component: RznComponent,
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SortingRoutingModule {}
