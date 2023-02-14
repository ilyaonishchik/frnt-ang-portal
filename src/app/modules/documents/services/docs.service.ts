import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {ICategory} from '@modules/documents/interfaces/category.interface'
import {TreeNode} from 'primeng/api'
import {IFile} from '@modules/documents/interfaces/file.interface'

@Injectable({
  providedIn: 'root',
})
export class DocsService {
  constructor(private http: HttpClient) {}

  // getCategories(): Observable<ICategory[]> {
  //   return this.http.get<ICategory[]>('assets/data/category-files.json')
  // }
  getCategories() {
    return this.http
      .get<any>('assets/data/category-files.json')
      .toPromise()
      .then((res) => <ICategory[]>res.items)
      .then((items) => {
        return this.toTreeNode(items)
      })
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
        key: item.id.toString(),
        label: item.name,
        icon: item.icon,
      }
      if (item.children) {
        res.children = this.toTreeNode(item.children)
      }
      result.push(res)
    }
    return result
  }
}
