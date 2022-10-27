export interface IResponseItems<T> {
  skip: number
  records: number
  results: T[]
}
