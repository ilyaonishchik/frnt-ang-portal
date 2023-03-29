import {Injectable, OnDestroy} from '@angular/core'
import {Store} from '@ngrx/store'

import {environment} from 'environments/environment'
import {currentUserSelector} from '@modules/auth/store/selectors'
import {IItemCRUD} from '../interfaces/rbac.interface'
import {IPermission} from '../interfaces/permission.interface'
// import {IRole} from '../interfaces/role.interface'
import {Subscription} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class RbacService implements OnDestroy {
  userPermissions: IPermission[] = []
  // userRoles: IRole[] = []

  rbacSubscription!: Subscription

  constructor(private store: Store) {
    this.initializeSubscriptions()
  }

  // checkRole(code: string): boolean {
  //   return (
  //     this.userRoles.findIndex((item) => {
  //       return item.code === code
  //     }) != -1
  //   )
  // }

  checkPermission(code: string): boolean {
    console.log(`RBAC service: checkPermission(${code})`)
    // console.log(this.userPermissions)
    if (
      this.userPermissions.findIndex((item) => {
        return item.code === environment.adminPermissionCode
      }) != -1
    ) {
      return true
    } else {
      return (
        this.userPermissions.findIndex((item) => {
          return item.code === code
        }) != -1
      )
    }
  }

  getItemCRUD(item: string | null): IItemCRUD {
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

  private initializeSubscriptions(): void {
    console.log('RBAC Service: initializeSubscriptions')
    this.rbacSubscription = this.store
      .select(currentUserSelector)
      .subscribe((user) => {
        // console.log(user)
        if (user) {
          this.userPermissions = user.permissions
          // this.userRoles = user.roles
        }
      })
  }

  ngOnDestroy(): void {
    console.log('RBAC Service: ngOnDestroy')
    if (this.rbacSubscription) {
      this.rbacSubscription.unsubscribe()
    }
  }
}
