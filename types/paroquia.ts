export interface MissaHorario {
  dia: string
  horarios: string[]
}

export interface Paroquia {
  id: string
  nome: string
  endereco: string
  distancia: string
  proximaMissa: string // Pode ser a próxima missa mais próxima ou a primeira do dia
  favorita: boolean
  coordenadas: { lat: number; lng: number }
  telefone: string
  descricao: string
  missas: MissaHorario[] // Estrutura unificada
  padre?: string
  fundacao?: string
  capacidade?: string
  imagem?: string
}
