import {Injectable} from '@angular/core'
import {Store} from '@ngrx/store'

import {IItemCRUD} from '../interfaces/rbac.interface'
import {currentUserSelector} from '../../modules/auth/store/selectors'
import {IPermission} from '../interfaces/permission.interface'
import {environment} from '../../../environments/environment'
import {IRole} from '../interfaces/role.interface'

@Injectable({
  providedIn: 'root',
})
export class RbacService {
  userPermissions: IPermission[] = []
  userRoles: IRole[] = []

  constructor(private store: Store) {
    this.store.select(currentUserSelector).subscribe((user) => {
      if (user) {
        this.userPermissions = user.permissions
        this.userRoles = user.roles
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

  getItemCRUD(item: string | null): IItemCRUD {
    if (this.checkPermission(environment.adminPermissionCode)) {
      return {
        create: true,
        read: true,
        update: true,
        delete: true,
      }
    } else {
      if (item) {
        return {
          create: this.checkPermission(`${item}:create`),
          read: this.checkPermission(`${item}:read`),
          update: this.checkPermission(`${item}:update`),
          delete: this.checkPermission(`${item}:delete`),
        }
      } else {
        return {
          create: false,
          read: false,
          update: false,
          delete: false,
        }
      }
    }
  }
}
