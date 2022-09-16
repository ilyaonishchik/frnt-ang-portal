import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {IUsers} from './user'
// import {ErrorService} from '../../../../services/error.service'
import {Converters} from '../../../../shared/converters'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient // private errorService: ErrorService
  ) {}

  getAll(params?: any): Observable<IUsers> {
    console.log(params)
    return this.http.get<IUsers>('/api/v1/users', {
      params: Converters.paramsToApi(params),
    })
    // .pipe(catchError(this.errorHandler))
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

  // private errorHandler(error: HttpErrorResponse) {
  //   this.errorService.handle(error.message)
  //   return throwError(() => error.message)
  // }
}
