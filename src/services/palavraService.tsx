import { api } from "./api";

export const palavraService = {
  getAllPalavras: () => api.get("/palavras"),
  createPalavra: (body: any) => api.post("/palavras", body),
};
