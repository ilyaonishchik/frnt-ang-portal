import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RoleComponent} from './forms/role/role.component'
import {ReadComponent} from './components/read/read.component'
import {DialogModule} from 'primeng/dialog'
import {LoadingModule} from '../../../../shared/modules/loading/loading.module'
import {CheckboxModule} from 'primeng/checkbox'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {ButtonModule} from 'primeng/button'
import {InputTextModule} from 'primeng/inputtext'
import {InputTextareaModule} from 'primeng/inputtextarea'
import {EffectsModule} from '@ngrx/effects'
import {GetRoleEffect} from './store/effects/get-role.effect'
import {StoreModule} from '@ngrx/store'
import {reducers} from './store/reducers'

@NgModule({
  declarations: [RoleComponent, ReadComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetRoleEffect]),
    StoreModule.forFeature('role', reducers),
    DialogModule,
    LoadingModule,
    CheckboxModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
  ],
  exports: [ReadComponent],
})
export class RoleModule {}
