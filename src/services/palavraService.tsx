import { api } from "./api";

export const palavraService = {
  getAllPalavras: () => api.get("/palavras"),
  createPalavra: (body: { palavra: string; categoryIds: number[] }) =>
    api.post("/palavras", body),
  deletePalavra: (id: number) => api.delete(`/palavras/${id}`),
  editPalavra: (
    id: number,
    body: { palavra?: string; categoryIds?: number[] },
  ) => api.patch(`/palavras/${id}`, body),
};
