import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {FilesComponent} from '@modules/admin/sections/docs/files/components/files/files.component'

const routes: Routes = [{path: '', component: FilesComponent}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilesRoutingModule {}
