import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {SortingComponent} from './components/sorting/sorting.component'

const routes: Routes = [{path: '', component: SortingComponent}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SortingRoutingModule {}
