import { api } from "./api";

export const palavraService = {
  getAllPalavras: () => api.get("/palavras"),
  createPalavra: (body: any) => api.post("/palavras", body),
  deletePalavra: (id: number) => api.delete(`/palavras/${id}`),
  editPalavra: (body: any) => api.patch("/palavras", body),
};
