import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CategoryComponent} from './forms/category/category.component'
import {CreateComponent} from './components/create/create.component'
import {ReadComponent} from './components/read/read.component'
import {UpdateComponent} from './components/update/update.component'
import {DeleteComponent} from './components/delete/delete.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {InputTextModule} from 'primeng/inputtext'
import {ValidateModule} from '@shared/modules/validate/validate.module'
import {InputNumberModule} from 'primeng/inputnumber'
import {InputTextareaModule} from 'primeng/inputtextarea'
import {DialogModule} from 'primeng/dialog'
import {LoadingModule} from '@shared/modules/loading/loading.module'
import {CheckboxModule} from 'primeng/checkbox'
import {ButtonModule} from 'primeng/button'
import {StoreModule} from '@ngrx/store'
import {
  categoryFeatureKey,
  reducerCategory,
} from '@modules/admin/components/docs/category/store/reducers'
import {EffectsModule} from '@ngrx/effects'
import {CreateCategoryEffect} from '@modules/admin/components/docs/category/store/effects/create-category.effect'
import {ReadCategoryEffect} from '@modules/admin/components/docs/category/store/effects/read-category.effect'
import {UpdateCategoryEffect} from '@modules/admin/components/docs/category/store/effects/update-category.effect'
import {DeleteCategoryEffect} from '@modules/admin/components/docs/category/store/effects/delete-category.effect'

@NgModule({
  declarations: [
    CategoryComponent,
    CreateComponent,
    ReadComponent,
    UpdateComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(categoryFeatureKey, reducerCategory),
    EffectsModule.forFeature([
      CreateCategoryEffect,
      ReadCategoryEffect,
      UpdateCategoryEffect,
      DeleteCategoryEffect,
    ]),
    ReactiveFormsModule,
    InputTextModule,
    ValidateModule,
    InputNumberModule,
    InputTextareaModule,
    DialogModule,
    LoadingModule,
    CheckboxModule,
    FormsModule,
    ButtonModule,
  ],
  exports: [ReadComponent, UpdateComponent],
})
export class CategoryModule {}
