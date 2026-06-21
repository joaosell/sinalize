import type { IUsuarioResumido } from "./usuario";

export interface ICategoriaResumida {
  id: number;
  nome: string;
  descricao: string;
}
export interface ICategoria {
  id: number;
  nome: string;
  descricao: string;
  criado_por: IUsuarioResumido;
  atualizado_por: IUsuarioResumido | null;
  criado_em: string;
  atualizado_em?: string | null;
}
