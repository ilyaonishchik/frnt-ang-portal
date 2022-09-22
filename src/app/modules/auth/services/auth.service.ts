import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {map, Observable} from 'rxjs'

import {ISignupRequest} from '../types/signup-request.interface'
import {ICurrentUser} from '../../../shared/types/current-user.interface'
import {AppService} from '../../../services/app.service'
import {ISignupResponse} from '../types/signup-response.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly apiUrl: string = ''

  constructor(private http: HttpClient, private appService: AppService) {
    this.apiUrl = this.appService.urlApiAuth
  }

  signUp(data: ISignupRequest): Observable<ICurrentUser> {
    return this.http
      .post<ISignupResponse>(`${this.apiUrl}signup`, data)
      .pipe(map((response: ISignupResponse) => response))
  }
}
