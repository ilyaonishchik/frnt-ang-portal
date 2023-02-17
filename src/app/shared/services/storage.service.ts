import {Injectable} from '@angular/core'
import {HttpClient, HttpResponse} from '@angular/common/http'

import {environment} from 'environments/environment'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private http: HttpClient) {}

  uploadFile(file: any) {
    const url = `${environment.urlApiStorage}/files/upload`
    const formData: FormData = new FormData()
    formData.append('file', file, file.name)

    return this.http.post(url, formData)
  }

  downloadFile(file_uuid: string): Observable<HttpResponse<Blob>> {
    const url = `${environment.urlApiStorage}/files/download/${file_uuid}`

    return this.http.get<Blob>(url, {
      observe: 'response',
      responseType: 'blob' as 'json',
    })
  }
}
