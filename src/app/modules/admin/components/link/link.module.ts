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
import {InputNumberModule} from 'primeng/inputnumber'

import {ValidateModule} from '@shared/modules/validate/validate.module'
import {LoadingModule} from '@shared/modules/loading/loading.module'

import {LinkComponent} from './forms/link/link.component'

import {CreateComponent} from './components/create/create.component'
import {ReadComponent} from './components/read/read.component'
import {UpdateComponent} from './components/update/update.component'
import {DeleteComponent} from './components/delete/delete.component'

import {linkFeatureKey, reducerLink} from './store/reducers'

import {ReadLinkEffect} from './store/effects/read-link.effect'
import {CreateLinkEffect} from './store/effects/create-link.effect'
import {UpdateLinkEffect} from './store/effects/update-link.effect'
import {DeleteLinkEffect} from './store/effects/delete-link.effect'

@NgModule({
  declarations: [
    LinkComponent,
    CreateComponent,
    ReadComponent,
    UpdateComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(linkFeatureKey, reducerLink),
    EffectsModule.forFeature([
      CreateLinkEffect,
      ReadLinkEffect,
      UpdateLinkEffect,
      DeleteLinkEffect,
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
  ],
  exports: [
    LinkComponent,
    CreateComponent,
    ReadComponent,
    UpdateComponent,
    DeleteComponent,
  ],
})
export class LinkModule {}
