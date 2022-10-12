import {Injectable} from '@angular/core'
import {Store} from '@ngrx/store'

import {IItemCRUD} from '../interfaces/rbac.interface'
import {currentUserSelector} from '../../modules/auth/store/selectors'
import {IPermission} from '../interfaces/permission.interface'
import {environment} from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class RbacService {
  userPermissions: IPermission[] = []

  constructor(private store: Store) {
    this.store.select(currentUserSelector).subscribe((user) => {
      if (user) {
        this.userPermissions = user.permissions
      }
    })
  }

  // checkRole(name: string): boolean {
  //   return false
  // }

  checkPermission(code: string): boolean {
    return (
      this.userPermissions.findIndex((item) => {
        return item.code === code
      }) != -1
    )
  }

  getItemCRUD(item: string): IItemCRUD {
    if (this.checkPermission(environment.adminPermissionCode)) {
      return {
        create: true,
        read: true,
        update: true,
        delete: true,
      }
    } else {
      return {
        create: this.checkPermission(`${item}:create`),
        read: this.checkPermission(`${item}:read`),
        update: this.checkPermission(`${item}:update`),
        delete: this.checkPermission(`${item}:delete`),
      }
    }
  }
}
