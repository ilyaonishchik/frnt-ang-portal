import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {UsersRoutingModule} from './users-routing.module'
import {UsersComponent} from './components/users/users.component'
import {AvsTableModule} from 'src/app/shared/modules/table/table.module'

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, UsersRoutingModule, AvsTableModule],
})
export class UsersModule {}
