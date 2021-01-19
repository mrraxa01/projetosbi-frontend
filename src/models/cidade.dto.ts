import { EstadoDTO } from "./estado.dto";

export interface CidadeDTO{
  id: string;
  nome: string;
  //sempre que tiver ?: o parâmetro é opcional
  estado?: EstadoDTO;
}
