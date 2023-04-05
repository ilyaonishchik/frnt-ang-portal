export interface ISubdivision {
  id: number
  parent: number | null
  name_sd: string
  name_sd_full: string | null
  name_sd_desc: string | null
  type_id: number | null
  name_st: string | null
  sort: number
  status: boolean
}

export interface ISubdivisionSave {
  parent: number | null
  name_sd: string
  name_sd_full: string | null
  name_sd_desc: string | null
  type_id: number | null
  sort: number
  status: boolean
}
