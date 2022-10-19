import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'

import {reducers} from '../user/store/reducers'
import {GetPermissionEffect} from './store/effects/get-permission.effect'
import {ReadComponent} from './components/read/read.component'
import {PermissionComponent} from './forms/permission/permission.component'
import {InputTextModule} from 'primeng/inputtext'
import {InputTextareaModule} from 'primeng/inputtextarea'
import {ReactiveFormsModule} from '@angular/forms'

@NgModule({
  declarations: [ReadComponent, PermissionComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetPermissionEffect]),
    StoreModule.forFeature('permission', reducers),
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
  ],
  exports: [ReadComponent],
})
export class PermissionModule {}
