import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
  name: 'filesize',
})
export class FileSizePipe implements PipeTransform {
  transform(value: number, precision = 1): unknown {
    const bytes: number = value ? value : 0
    const exp: number = (Math.log(bytes) / Math.log(1024)) | 0
    let result: string = (bytes / Math.pow(1024, exp)).toFixed(precision)
    result = result.replace(/\.(0)+$/, '')
    return result + ' ' + (exp == 0 ? 'B' : 'KMGTPEZY'[exp - 1] + 'B')
  }
}
