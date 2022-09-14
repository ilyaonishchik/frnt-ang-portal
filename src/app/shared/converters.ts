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

// interface IApiParams {
//   skip: number
//   limit: number
//   page?: number
//   search?: string
//   sort?: string
// }

export class Converters {
  static paramsToApi(params: ITableParams) {
    return {
      skip: params.first,
      limit: params.rows,
      search: params.globalFilter,
      sort: params.sortField,
    }
  }
}
