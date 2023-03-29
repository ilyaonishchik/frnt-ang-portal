export interface IFile {
  id: number
  file_name: string
  file_uuid: string
  file_desc?: string
  file_size: number
  file_type: string
  dt_cr: string
  username: string
  downloads: number
}
