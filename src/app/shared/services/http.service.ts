import {Injectable} from '@angular/core'
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http'
import {catchError, Observable, throwError} from 'rxjs'

// https://medium.com/@kalanaweerarathne/centralize-your-angular-http-logic-5d137cdd7a4c

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get<T>(
    url: string,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.http
      .get<T>(url, {params, headers})
      .pipe(catchError(this.handleError))
  }

  post<T>(
    url: string,
    body: any,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.http
      .post<T>(url, body, {params, headers})
      .pipe(catchError(this.handleError))
  }

  put<T>(
    url: string,
    body: any,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.http
      .put<T>(url, body, {params, headers})
      .pipe(catchError(this.handleError))
  }

  delete<T>(
    url: string,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.http
      .delete<T>(url, {params, headers})
      .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    // You can customize error handling based on your application's needs
    let errorMessage = 'An error occurred.'
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
    }
    console.error(errorMessage)
    return throwError(() => error)
  }
}
