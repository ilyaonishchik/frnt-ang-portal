import {
  Directive,
  Input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core'
import {IPermission} from '@shared/interfaces/permission.interface'
import {IUserFull} from '@shared/interfaces/user.interface'

// https://itnext.io/role-based-access-control-in-angular-templates-2eeca497855
@Directive({
  selector: '[appHasPermissions]',
})
export class HasPermissionsDirective implements OnChanges {
  private visible = false
  private permissions: IPermission[] = []
  private user: IUserFull | null = null

  @Input() set hasPermissions(permissions: IPermission[]) {
    this.permissions = permissions
  }
  @Input() set hasPermissionsFor(user: IUserFull) {
    this.user = user
  }

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnChanges() {
    if (!this.permissions?.length || !this.user) {
      return
    }

    if (this.visible) {
      return
    }

    if (
      this.user.permissions.some((permission) =>
        this.permissions.includes(permission)
      )
    ) {
      this.viewContainer.clear()
      this.viewContainer.createEmbeddedView(this.templateRef)
      this.visible = true
      return
    }

    this.viewContainer.clear()
    this.visible = false
  }
}
