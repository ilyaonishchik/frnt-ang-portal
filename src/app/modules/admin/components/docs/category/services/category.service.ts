import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {environment} from 'environments/environment'
import {
  ICategory,
  ICategorySave,
} from '@modules/admin/sections/docs/categories/interfaces/category.interface'
import {IDeleteResponse} from '@shared/interfaces/delete-response.interface'

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly fullUrl: string
  constructor(private http: HttpClient) {
    this.fullUrl = `${environment.urlApiStorage}/categories`
  }

  getCategory(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.fullUrl}/${id}`)
  }

  createCategory(item: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(this.fullUrl, this.itemToSave(item))
  }

  updateCategory(id: number, item: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(
      `${this.fullUrl}/${id}`,
      this.itemToSave(item)
    )
  }

  deleteCategory(id: number): Observable<IDeleteResponse> {
    return this.http.delete<IDeleteResponse>(`${this.fullUrl}/${id}`)
  }

  itemToSave(item: ICategory): ICategorySave {
    return {
      parent: item.parent,
      cat_name: item.cat_name,
      cat_desc: item.cat_desc,
      sort: item.sort,
      status: item.status,
    }
  }
}
