import {HttpParams} from '@angular/common/http'

interface ITableParams {
  first: number
  rows: number
  sortField: string
  sortOrder: number
  filters: {
    global: {
      value: string
      matchMode: string
    }
  }
  globalFilter: string
}

export class Converters {
  static paramsToApi(params: ITableParams): HttpParams {
    let result = new HttpParams()
      .append('skip', params.first)
      .append('limit', params.rows)

    if (params.sortField) {
      if (params.sortOrder === -1) {
        result = result.append('sort', '-' + params.sortField)
      } else {
        result = result.append('sort', params.sortField)
      }
    }

    if (params.globalFilter) {
      result = result.append('search', params.globalFilter)
    }

    return result
  }
}
