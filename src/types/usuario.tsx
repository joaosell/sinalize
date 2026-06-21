export interface IUsuario {
  id: number;
  nome: string;
  email: string;
  senha?: string;
  criado_em: string;
}

export interface IUsuarioResumido {
  id: number;
  nome: string;
}
