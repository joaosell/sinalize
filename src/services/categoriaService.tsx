import { api } from "./api";

export const categoriaService = {
  getAllCategorias: () => api.get("/categorias"),
  createCategoria: (body: { nome: string; descricao: string }) =>
    api.post("/categorias", body),
  deleteCategoria: (id: number) => api.delete(`/categorias/${id}`),
  editCategoria: (id: number, body: { nome?: string; descricao?: string }) =>
    api.patch(`/categorias/${id}`, body),
};
