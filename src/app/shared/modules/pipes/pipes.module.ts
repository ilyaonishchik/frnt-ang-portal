import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FileSizePipe} from './file-size.pipe'
import {MimeIconPipe} from './mime-icon.pipe'

@NgModule({
  declarations: [FileSizePipe, MimeIconPipe],
  exports: [FileSizePipe, MimeIconPipe],
  imports: [CommonModule],
})
export class PipesModule {}
