import type { IPalavraResumida } from "./palavra";
import type { IUsuarioResumido } from "./usuario";

export interface IQuizPalavra {
  id: number;
  acertou: boolean | null;
  respondido_em: string | null;

  palavra: IPalavraResumida;
}

export default interface IQuiz {
  id: number;
  id_usuario: number;
  criado_em: string;
  usuario?: IUsuarioResumido;
  quiz_palavras: IQuizPalavra[];
}
