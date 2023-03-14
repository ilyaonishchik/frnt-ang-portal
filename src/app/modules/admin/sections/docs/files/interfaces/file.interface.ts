export interface IFile {
  id: number
  file_name: string
  file_ext: string | null
  file_type: string
  file_size: number
  file_desc: string | null
  // path_name: string
  // file_uuid: string
  // user_id: number
  downloads: number
  status: boolean
}

export interface IFileSave {
  file_name: string
  // file_ext: string | null
  // file_type: string
  // file_size: number
  file_desc: string | null
  // path_name: string
  // file_uuid: string
  // user_id: number
  // downloads: number
  status: boolean
}
