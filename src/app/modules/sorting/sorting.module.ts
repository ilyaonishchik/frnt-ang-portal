import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {SharedModule} from '../shared/shared.module'
import {SortingRoutingModule} from './sorting-routing.module'

import {MainComponent} from './components/main/main.component'
import {SearchComponent} from './components/search/search.component'
import {CellsComponent} from './components/cells/cells.component'
import {PdpComponent} from './components/pdp/pdp.component'
import {RznComponent} from './components/rzn/rzn.component'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [
    MainComponent,
    SearchComponent,
    CellsComponent,
    PdpComponent,
    RznComponent,
  ],
  imports: [
    CommonModule,
    SortingRoutingModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
  ],
})
export class SortingModule {}
