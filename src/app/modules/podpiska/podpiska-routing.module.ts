import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {MainComponent} from './components/main/main.component'
import {SortirovkaComponent} from './components/sortirovka/sortirovka.component'

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {path: 'srt', component: SortirovkaComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PodpiskaRoutingModule {}
