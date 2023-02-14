import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import {environment} from 'environments/environment'
import {IReport} from '@shared/interfaces/report.interface'

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getReport(params: IReport) {
    const httpParams: HttpParams = new HttpParams().set('report', params.report)
    // .set('format', params.format!)
    // httpParams.set('report', params.report)
    // if (params.format) {
    //   httpParams.set('format', params.format)
    // }
    // if (params.pagenav) {
    //   httpParams.set('pagenav', params.pagenav)
    // }
    // if (params.multipage) {
    //   httpParams.set('multipage', params.multipage)
    // }
    // if (params.pagerange) {
    //   httpParams.set('pagerange', params.pagerange)
    // }

    // const url = environment.urlApiPdp + '/report'

    // window.open(url, '_blank')

    // this.router.navigate([environment.urlApiReport + '/result'], {
    //   queryParams: params,
    // })
    // console.log(httpParams)

    const url = environment.urlApiReport + '/result'
    // '?report=' +
    // params.report +
    // '&format=' +
    // params.format
    console.log(url)

    return this.http.get(url, {
      params: httpParams,
      // observe: 'response',
      responseType: 'arraybuffer',
      // responseType: 'blob',
    })
  }

  getReportWindow(reportParams: IReport): void {
    let httpParams: HttpParams = new HttpParams().set(
      'report',
      reportParams.report
    )
    if (reportParams.format) {
      httpParams = httpParams.set('format', reportParams.format)
    }
    if (reportParams.pagerange) {
      httpParams = httpParams.set('pagerange', reportParams.pagerange)
    }
    if (reportParams.multipage) {
      httpParams = httpParams.set('multipage', reportParams.multipage)
    }
    if (reportParams.pagenav) {
      httpParams = httpParams.set('pagenav', reportParams.pagenav)
    }
    if (reportParams.params) {
      for (const reportParamsKey in reportParams.params) {
        httpParams = httpParams.set(
          reportParamsKey,
          reportParams.params[reportParamsKey]
        )
      }
    }

    const url = environment.urlApiReport + '/result?' + httpParams.toString()
    window.open(url, '_blank')
  }
}
