import {Injectable} from '@angular/core'
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http'
import {catchError, Observable, throwError} from 'rxjs'
import {IUser} from './user'
import {ErrorService} from '../../../../services/error.service'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getAll(): Observable<IUser[]> {
    return this.http
      .get<IUser[]>('/api/v1/users', {
        params: new HttpParams({
          fromObject: {limit: 100},
        }),
      })
      .pipe(catchError(this.errorHandler))
  }

  // getUsersAll() {
  //   return this.http
  //     .get<any>('/api/v1/users', {
  //       params: new HttpParams({
  //         fromObject: {limit: 100},
  //       }),
  //     })
  //     .toPromise()
  //     .then((res) => res.results as IUser[])
  //     .then((results) => results)
  // }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
