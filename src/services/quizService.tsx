import { api } from "./api";

export const quizService = {
  createQuiz: (categoriaIds: number[]) =>
    api.post(`/quizzes?categoriaIds=${categoriaIds.join(",")}`, {}),
  getQuiz: (id: number) => api.get(`/quizzes/${id}`),
  responderPalavra: (quizPalavraId: number, acertou: boolean) =>
    api.patch(`/quizzes/palavras/${quizPalavraId}/responder`, { acertou }),
};
