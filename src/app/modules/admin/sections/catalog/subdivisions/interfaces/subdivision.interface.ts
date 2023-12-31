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

export interface ISubdivisionType {
  id: number
  name_st: string
  name_st_full: string | null
  name_st_desc: string | null
  sort: number
  status: boolean
}

export interface ISubdivisionTypeSave {
  name_st: string
  name_st_full: string | null
  name_st_desc: string | null
  sort: number
  status: boolean
}
