import {Injectable} from '@angular/core'
import {Store} from '@ngrx/store'

import {IItemCRUD} from '../interfaces/rbac.interface'
import {currentUserSelector} from '../../modules/auth/store/selectors'
import {IPermission} from '../interfaces/permission.interface'

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

  checkPermission(name: string): boolean {
    return (
      this.userPermissions.findIndex((item) => {
        return item.name === name
      }) != -1
    )
  }

  getItemCRUD(item: string): IItemCRUD {
    let crud: IItemCRUD = {
      create: false,
      read: false,
      update: false,
      delete: false,
    }
    crud.create = this.checkPermission(`${item}:create`)
    crud.read = this.checkPermission(`${item}:read`)
    crud.update = this.checkPermission(`${item}:update`)
    crud.delete = this.checkPermission(`${item}:delete`)

    return crud
  }
}
