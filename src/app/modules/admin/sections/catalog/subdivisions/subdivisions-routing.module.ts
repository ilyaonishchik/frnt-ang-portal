import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {SubdivisionsComponent} from '@modules/admin/sections/catalog/subdivisions/components/subdivisions/subdivisions.component'
import {SubdivisionTypesComponent} from '@modules/admin/sections/catalog/subdivisions/components/subdivision-types/subdivision-types.component'

const routes: Routes = [
  {path: '', component: SubdivisionsComponent},
  {path: 'types', component: SubdivisionTypesComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubdivisionsRoutingModule {}
