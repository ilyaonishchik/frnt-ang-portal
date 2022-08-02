import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {MainComponent} from './components/main/main.component'

const routes: Routes = [
  {path: '', component: MainComponent},
  // {path: 'main', component: MainComponent},
  // {path: '**', redirectTo: 'main', pathMatch: 'full'},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
