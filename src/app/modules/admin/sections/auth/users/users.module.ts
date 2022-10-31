import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {UsersRoutingModule} from './users-routing.module'
import {ListUsersComponent} from './components/list-users/list-users.component'
import {ListItemsModule} from '../../../../../shared/modules/list-items/list-items.module'

@NgModule({
  declarations: [ListUsersComponent],
  imports: [CommonModule, UsersRoutingModule, ListItemsModule],
})
export class UsersModule {}
