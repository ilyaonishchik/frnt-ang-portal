import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'

import {DialogModule} from 'primeng/dialog'
import {CheckboxModule} from 'primeng/checkbox'
import {ButtonModule} from 'primeng/button'
import {InputTextModule} from 'primeng/inputtext'
import {InputTextareaModule} from 'primeng/inputtextarea'

import {ValidateModule} from '@shared/modules/validate/validate.module'
import {LoadingModule} from '@shared/modules/loading/loading.module'

import {MenuComponent} from './forms/menu/menu.component'

import {CreateComponent} from './components/create/create.component'
import {ReadComponent} from './components/read/read.component'
import {UpdateComponent} from './components/update/update.component'
import {DeleteComponent} from './components/delete/delete.component'

import {menuFeatureKey, reducerMenu} from './store/reducers'

import {ReadMenuEffect} from './store/effects/read-menu.effect'
import {CreateMenuEffect} from './store/effects/create-menu.effect'
import {UpdateMenuEffect} from './store/effects/update-menu.effect'
import {DeleteMenuEffect} from './store/effects/delete-menu.effect'
import {InputNumberModule} from 'primeng/inputnumber'
import {DropdownModule} from 'primeng/dropdown'

@NgModule({
  declarations: [
    MenuComponent,
    CreateComponent,
    ReadComponent,
    UpdateComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(menuFeatureKey, reducerMenu),
    EffectsModule.forFeature([
      CreateMenuEffect,
      ReadMenuEffect,
      UpdateMenuEffect,
      DeleteMenuEffect,
    ]),
    DialogModule,
    ValidateModule,
    CheckboxModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    LoadingModule,
    InputNumberModule,
    DropdownModule,
  ],
  exports: [
    MenuComponent,
    CreateComponent,
    ReadComponent,
    UpdateComponent,
    DeleteComponent,
  ],
})
export class MenuModule {}
