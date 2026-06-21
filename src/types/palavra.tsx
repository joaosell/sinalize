import type { ICategoriaResumida } from "./categoria";
import type { IUsuarioResumido } from "./usuario";

export interface IPalavra {
  id: number;
  palavra: string;
  descricao: string;
  criado_por: IUsuarioResumido;
  atualizado_por: IUsuarioResumido | null;
  criado_em: string;
  atualizado_em?: string | null;
  categorias: ICategoriaResumida[];
}

export interface IPalavraResumida {
  id: number;
  palavra: string;
  descricao: string;
}
