import {Injectable} from '@angular/core'
import {HttpClient, HttpResponse} from '@angular/common/http'

import {environment} from 'environments/environment'
import {Observable, Subject, takeUntil} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  unsubscribeUploading = new Subject<void>()

  constructor(private http: HttpClient) {}

  _uploadFile(file: any): void {
    const url = `${environment.urlApiStorage}/files`
    const formData: FormData = new FormData()
    formData.append('file_body', file, file.name)
    formData.append('category', '1')
    this.http.post<any>(url, formData).subscribe({
      next: (r) => console.log(r),
      error: (e) => console.log(e),
    })
  }

  uploadFile(
    file_body: File,
    category: string,
    file_desc: string | null = null
  ): Observable<any> {
    const url = `${environment.urlApiStorage}/files`
    const formData: FormData = new FormData()
    formData.append('file_body', file_body, file_body.name)
    formData.append('category', category)
    if (file_desc) {
      formData.append('file_desc', file_desc)
    }
    return this.http
      .post(url, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        takeUntil(this.unsubscribeUploading)
        // catchError((error) => {
        //   console.error(error)
        //   return throwError(error)
        // })
      )
  }

  _downloadFile(file_uuid: string): Observable<HttpResponse<Blob>> {
    const url = `${environment.urlApiStorage}/files/download/${file_uuid}`

    return this.http.get<Blob>(url, {
      observe: 'response',
      responseType: 'blob' as 'json',
    })
  }

  downloadFile(file_uuid: string, file_name: string): void {
    const url = environment.urlApiStorage
    const link = document.createElement('a')
    link.href = `${url}/files/download/${file_uuid}`
    link.download = file_name
    link.click()
  }

  _downloadFileStream(file_uuid: string): Observable<Blob> {
    const url = `${environment.urlApiStorage}/files/downloads/${file_uuid}`

    return this.http.get(url, {
      // reportProgress: true,
      // observe: 'events',
      responseType: 'blob',
    })
  }

  downloadFileStream(file_uuid: string): Observable<HttpResponse<Blob>> {
    const url = `${environment.urlApiStorage}/files/downloads/${file_uuid}`

    return this.http.get<Blob>(url, {
      // reportProgress: true,
      // observe: 'events',
      observe: 'response',
      responseType: 'blob' as 'json',
    })
  }

  cancelUploading(): void {
    console.warn('Uploading file canceled')
    this.unsubscribeUploading.next()
  }
}
