import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
  name: 'mimeIcon',
})
export class MimeIconPipe implements PipeTransform {
  transform(mimeType: string): string {
    let icon = 'fa-file'
    const icon_classes: {[key: string]: string} = {
      // Media
      image: 'fa-file-image',
      audio: 'fa-file-audio',
      video: 'fa-file-video',
      // Documents
      'application/pdf': 'fa-file-pdf',
      'application/msword': 'fa-file-word',
      'application/vnd.ms-word': 'fa-file-word',
      'application/vnd.oasis.opendocument.text': 'fa-file-word',
      'application/vnd.openxmlformatsfficedocument.wordprocessingml':
        'fa-file-word',
      'application/vnd.ms-excel': 'fa-file-excel',
      'application/vnd.openxmlformatsfficedocument.spreadsheetml':
        'fa-file-excel',
      'application/vnd.oasis.opendocument.spreadsheet': 'fa-file-excel',
      'application/vnd.ms-powerpoint': 'fa-file-powerpoint',
      'application/vnd.openxmlformatsfficedocument.presentationml':
        'fa-file-powerpoint',
      'application/vnd.oasis.opendocument.presentation': 'fa-file-powerpoint',
      'text/plain': 'fa-file-lines',
      'text/html': 'fa-file-code',
      'application/json': 'fa-file-code',
      // Archives
      'application/gzip': 'fa-file-archive',
      'application/zip': 'fa-file-archive',
    }

    for (const key in icon_classes) {
      if (mimeType.search(key) === 0) {
        icon = icon_classes[key]
      }
    }
    return `far ${icon}`
  }
}
