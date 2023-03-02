import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {ICategory} from '@modules/documents/interfaces/category.interface'
import {TreeNode} from 'primeng/api'
import {IFile} from '@modules/documents/interfaces/file.interface'
import {Observable} from 'rxjs'
import {environment} from 'environments/environment'

@Injectable({
  providedIn: 'root',
})
export class DocsService {
  constructor(private http: HttpClient) {}

  getCategories(cat_id: number): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(
      `${environment.urlApiStorage}/categories/${cat_id}/tree`
    )
  }

  getFiles(category: number | string) {
    return this.http
      .get<any>('assets/data/files.json')
      .toPromise()
      .then((res) => <IFile[]>res.items)
      .then((items) => {
        return items.filter((item) => {
          return item.category == category
        })
      })
  }

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
