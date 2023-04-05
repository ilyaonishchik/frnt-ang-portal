import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {SubdivisionsComponent} from '@modules/admin/sections/catalog/subdivisions/components/subdivisions/subdivisions.component'

const routes: Routes = [{path: '', component: SubdivisionsComponent}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubdivisionsRoutingModule {}
