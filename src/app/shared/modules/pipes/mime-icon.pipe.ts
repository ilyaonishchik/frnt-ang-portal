import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
  name: 'mimeIcon',
})
export class MimeIconPipe implements PipeTransform {
  transform(mimeType: string): string {
    let icon = 'far fa-file'
    const icon_classes: {[key: string]: string} = {
      // Media
      image: 'far fa-file-image',
      audio: 'far fa-file-audio',
      video: 'far fa-file-video',
      // Documents
      'application/pdf': 'far fa-file-pdf',
      // 'application/pdf': 'pi pi-file-pdf',
      //Word
      'application/msword': 'far fa-file-word',
      'application/vnd.ms-word': 'far fa-file-word',
      // 'application/vnd.oasis.opendocument.text': 'fa-file-word',
      'application/vnd.openxmlformats-officedocument.wordprocessingml':
        'far fa-file-word',
      //Excel
      'application/vnd.ms-excel': 'far fa-file-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml':
        'far fa-file-excel',
      // 'application/vnd.oasis.opendocument.spreadsheet': 'fa-file-excel',
      //PowerPoint
      'application/vnd.ms-powerpoint': 'far fa-file-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml':
        'far fa-file-powerpoint',
      // 'application/vnd.oasis.opendocument.presentation': 'fa-file-powerpoint',
      //Text
      'text/plain': 'far fa-file-lines',
      'text/csv': 'fas fa-file-csv',
      'text/html': 'far fa-file-code',
      'application/json': 'far fa-file-code',
      // Archives
      'application/gzip': 'far fa-file-zipper',
      'application/zip': 'far fa-file-zipper',
      'application/octet-stream': 'far fa-file-zipper',
      //Application
      'application/x-msdownload': 'far fa-file-code',
      //Torrent
      'application/x-bittorrent': 'far fa-file',
    }

    for (const key in icon_classes) {
      if (mimeType.search(key) === 0) {
        icon = icon_classes[key]
      }
    }
    return `${icon}`
  }
}
