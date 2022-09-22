import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {IUsers} from './user'
// import {ErrorService} from '../../../../services/error.service'
import {Converters} from '../../../../shared/converters'
import {AppService} from '../../../../services/app.service'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl: string = ''
  constructor(private http: HttpClient, private appService: AppService) {
    this.apiUrl = appService.urlApiAuth
  }

  getAll(params?: any): Observable<IUsers> {
    return this.http.get<IUsers>(this.apiUrl + 'users/', {
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
