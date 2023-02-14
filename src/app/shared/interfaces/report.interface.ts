export interface IReport {
  report: string
  params?: {[key: string]: string | number}
  format?: string
  pagerange?: string
  multipage?: number
  pagenav?: number
}
