import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {environment} from 'environments/environment'
import {Observable} from 'rxjs'
import {
  IFile,
  IFileSave,
} from '@modules/admin/sections/docs/files/interfaces/file.interface'
import {IDeleteResponse} from '@shared/interfaces/delete-response.interface'

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private readonly fullUrl: string
  constructor(private http: HttpClient) {
    this.fullUrl = `${environment.urlApiStorage}/files`
  }

  getFile(id: number): Observable<IFile> {
    return this.http.get<IFile>(`${this.fullUrl}/${id}`)
  }

  createFile(item: IFile): Observable<IFile> {
    return this.http.post<IFile>(this.fullUrl, this.itemToSave(item))
  }

  updateFile(id: number, item: IFile): Observable<IFile> {
    return this.http.put<IFile>(`${this.fullUrl}/${id}`, this.itemToSave(item))
  }

  deleteFile(id: number): Observable<IDeleteResponse> {
    return this.http.delete<IDeleteResponse>(`${this.fullUrl}/${id}`)
  }

  private itemToSave(item: IFile): IFileSave {
    return {
      file_name: item.file_name,
      // file_type: item.file_type,
      file_desc: item.file_desc,
      // file_ext: item.file_ext,
      // file_size: item.file_size,
      // user_id: item.user_id,
      // downloads: item.downloads,
      status: item.status,
    }
  }
}
