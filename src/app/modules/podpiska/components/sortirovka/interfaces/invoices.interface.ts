export interface IIncoming {
  id_rec: number
  barcode: string | null
  indizd: string
  naimen: string
  nom_izd: string
  nom_count: number
  magazine: number
}

export interface IOutgoing {
  zipcode: string
  naim_ops: string
  cell: number | null
  nom_count: number
}
