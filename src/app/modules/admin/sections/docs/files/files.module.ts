import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {FilesRoutingModule} from './files-routing.module'
import {FilesComponent} from './components/files/files.component'
import {AvsTableModule} from '@shared/modules/table/table.module'
import {StoreModule} from '@ngrx/store'
import {
  filesFeatureKey,
  reducerFiles,
} from '@modules/admin/sections/docs/files/store/reducers'
import {EffectsModule} from '@ngrx/effects'
import {GetFilesEffect} from '@modules/admin/sections/docs/files/store/effects/files.effect'

@NgModule({
  declarations: [FilesComponent],
  imports: [
    CommonModule,
    FilesRoutingModule,
    StoreModule.forFeature(filesFeatureKey, reducerFiles),
    EffectsModule.forFeature([GetFilesEffect]),
    AvsTableModule,
  ],
})
export class FilesModule {}
