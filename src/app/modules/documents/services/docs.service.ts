import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {ICategory} from '@modules/documents/interfaces/category.interface'
import {LazyLoadEvent, TreeNode} from 'primeng/api'
import {IFile} from '@modules/documents/interfaces/file.interface'
import {Observable} from 'rxjs'
import {environment} from 'environments/environment'
import {IResponseItems} from '@shared/interfaces/response-items.interface'
import {eventAction, eventToParams} from '@shared/functions/event.function'

@Injectable({
  providedIn: 'root',
})
export class DocsService {
  private readonly fullUrl: string
  previousEvent: LazyLoadEvent = {first: 0}
  constructor(private http: HttpClient) {
    this.fullUrl = `${environment.urlApiStorage}/files/category`
  }

  getCategories(cat_id: number | string): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(
      `${environment.urlApiStorage}/categories/${cat_id}/tree`
    )
  }

  getFiles(
    event: LazyLoadEvent | null,
    category_id: number | string,
    use_cache: boolean
  ): Observable<IResponseItems<IFile>> {
    this.previousEvent = eventAction(event, this.previousEvent, 2)
    let headers = new HttpHeaders()
    if (!use_cache) {
      headers = headers.append('Cache-Control', 'no-cache')
    }
    console.log(headers)
    return this.http.get<IResponseItems<IFile>>(
      `${this.fullUrl}/${category_id}`,
      {
        headers: headers,
        params: eventToParams(this.previousEvent),
      }
    )
  }

  // getFiles_(category: number | string) {
  //   return this.http
  //     .get<any>('assets/data/files.json')
  //     .toPromise()
  //     .then((res) => <IFile[]>res.items)
  //     .then((items) => {
  //       return items.filter((item) => {
  //         return item.category == category
  //       })
  //     })
  // }

  toTreeNode(data: ICategory[]): TreeNode[] {
    const result: TreeNode[] = []
    for (const item of data) {
      const res: TreeNode = {
        key: `${item.id}`,
        label: item.label,
        icon: item.icon,
      }

      if (item.items) {
        res.children = this.toTreeNode(item.items)
      }
      result.push(res)
    }
    return result
  }
}
