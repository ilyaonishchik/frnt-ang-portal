import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {CategoriesRoutingModule} from './categories-routing.module'
import {CategoriesComponent} from './components/categories/categories.component'
import {AvsTableModule} from '@shared/modules/table/table.module'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {GetCategoriesEffect} from '@modules/admin/sections/docs/categories/store/effects/categories.effect'
import {
  categoriesFeatureKey,
  reducerCategories,
} from '@modules/admin/sections/docs/categories/store/reducers'
import {CategoryModule} from '@modules/admin/components/docs/category/category.module'

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    EffectsModule.forFeature([GetCategoriesEffect]),
    StoreModule.forFeature(categoriesFeatureKey, reducerCategories),
    AvsTableModule,
    CategoryModule,
  ],
})
export class CategoriesModule {}
