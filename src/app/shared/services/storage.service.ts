import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

import {environment} from 'environments/environment'

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private http: HttpClient) {}

  uploadFile(file: any) {
    const formData: FormData = new FormData()
    formData.append('file', file, file.name)

    return this.http.post(`${environment.urlApiStorage}/files/upload`, formData)
  }
}
