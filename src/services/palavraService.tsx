import { api } from "./api";

export const palavraService = {
  getAllPalavras: () => api.get("/palavras"),
  createPalavra: (body: { palavra: string; categoryIds: number[] }) =>
    api.post("/palavras", body),
  deletePalavra: (id: number) => api.delete(`/palavras/${id}`),
  getRandomPalavras: (excluir: number[], quantidade: number) =>
    api.get("/palavras/aleatorias", {
      params: { excluir: excluir.join(","), quantidade },
    }),
  editPalavra: (
    id: number,
    body: { palavra?: string; categoryIds?: number[] },
  ) => api.patch(`/palavras/${id}`, body),
};
