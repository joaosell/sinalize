import React, { useEffect, useRef, useState } from "react";
import { Spin, Typography } from "antd";
import { useNavigate } from "react-router";

import VLibrasPlayer from "../components/VLibrasPlayer";
import CategoriaSelectModal from "../components/CategoriaSelectModal";
import QuizProgressBar from "../components/QuizProgressBar";
import AlternativasQuiz from "../components/AlternativasQuiz";
import type { OpcaoQuiz } from "../components/AlternativasQuiz";
import ResultadoModal from "../components/ResultadoModal";

import { quizService } from "../services/quizService";
import { palavraService } from "../services/palavraService";
import type IQuiz from "../types/quiz";
import type { IPalavraResumida } from "../types/palavra";

const { Text } = Typography;

const primaryBlue = "#1A2D72";

type Fase = "selecionando" | "carregando" | "jogando" | "finalizado";

const embaralhar = <T,>(arr: T[]): T[] => {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
};

const QuizPage: React.FC = () => {
  const navigate = useNavigate();

  const [fase, setFase] = useState<Fase>("selecionando");
  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [resultados, setResultados] = useState<(boolean | null)[]>([]);

  const [opcoes, setOpcoes] = useState<OpcaoQuiz[]>([]);
  const [idSelecionado, setIdSelecionado] = useState<number | null>(null);
  const [respondido, setRespondido] = useState(false);

  const [vlibrasPronto, setVlibrasPronto] = useState(false);

  const avancoTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const itemAtual = quiz?.quiz_palavras[indiceAtual];
  const palavraCorreta: IPalavraResumida | undefined = itemAtual?.palavra;
  const total = quiz?.quiz_palavras.length ?? 0;

  const iniciarQuiz = async (categoriaIds: number[]) => {
    setFase("carregando");
    try {
      const resposta: { quiz: IQuiz } =
        await quizService.createQuiz(categoriaIds);
      const novoQuiz = resposta.quiz;
      setQuiz(novoQuiz);
      setResultados(novoQuiz.quiz_palavras.map(() => null));
      setIndiceAtual(0);
      setFase("jogando");
    } catch {
      alert("Não foi possível criar o quiz. Tente novamente.");
      navigate("/");
    }
  };

  useEffect(() => {
    if (fase !== "jogando" || !palavraCorreta) return;

    let cancelado = false;

    palavraService
      .getRandomPalavras([palavraCorreta.id], 3)
      .then((erradas: IPalavraResumida[]) => {
        if (cancelado) return;
        const alternativas: OpcaoQuiz[] = embaralhar([
          { id: palavraCorreta.id, palavra: palavraCorreta.palavra },
          ...erradas.map((p) => ({ id: p.id, palavra: p.palavra })),
        ]);
        setOpcoes(alternativas);
      });

    return () => {
      cancelado = true;
    };
  }, [fase, palavraCorreta]);

  useEffect(() => {
    return () => {
      if (avancoTimeout.current) clearTimeout(avancoTimeout.current);
    };
  }, []);

  const handleSelecionar = (opcao: OpcaoQuiz) => {
    if (respondido || !itemAtual || !palavraCorreta) return;

    const acertou = opcao.id === palavraCorreta.id;
    setIdSelecionado(opcao.id);
    setRespondido(true);
    setResultados((prev) => {
      const novo = [...prev];
      novo[indiceAtual] = acertou;
      return novo;
    });

    quizService.responderPalavra(itemAtual.id, acertou).catch(() => {});

    avancoTimeout.current = setTimeout(() => {
      if (indiceAtual + 1 < total) {
        setOpcoes([]);
        setIdSelecionado(null);
        setRespondido(false);
        setIndiceAtual((i) => i + 1);
      } else {
        setFase("finalizado");
      }
    }, 1500);
  };

  const reiniciar = () => {
    if (avancoTimeout.current) clearTimeout(avancoTimeout.current);
    setQuiz(null);
    setIndiceAtual(0);
    setResultados([]);
    setOpcoes([]);
    setIdSelecionado(null);
    setRespondido(false);
    setFase("selecionando");
  };

  const acertos = resultados.filter((r) => r === true).length;
  const jogando = fase === "jogando";
  const palavraVlibras =
    (jogando || fase === "finalizado") && palavraCorreta
      ? palavraCorreta.palavra
      : "";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 760,
        margin: "0 auto",
        padding: "4vh 2rem",
        minHeight: "80vh",
      }}
    >
      {quiz && fase !== "selecionando" && (
        <QuizProgressBar
          total={total}
          resultados={resultados}
          currentIndex={indiceAtual}
          primaryBlue={primaryBlue}
        />
      )}

      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          background: "#111",
          borderRadius: 14,
          overflow: "hidden",
          marginBottom: 24,
        }}
      >
        <VLibrasPlayer
          palavra={palavraVlibras}
          onReady={() => setVlibrasPronto(true)}
        />

        {!vlibrasPronto && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              color: "#fff",
              zIndex: 3,
            }}
          >
            <Spin />
            <Text style={{ color: "#fff" }}>Carregando personagem 3D...</Text>
          </div>
        )}

        {fase === "carregando" && vlibrasPronto && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.4)",
              color: "#fff",
              zIndex: 3,
            }}
          >
            <Spin />
            <Text style={{ color: "#fff", marginLeft: 12 }}>
              Montando o seu quiz...
            </Text>
          </div>
        )}
      </div>

      {jogando && palavraCorreta && opcoes.length > 0 && (
        <AlternativasQuiz
          opcoes={opcoes}
          idCorreto={palavraCorreta.id}
          idSelecionado={idSelecionado}
          desabilitado={respondido}
          onSelecionar={handleSelecionar}
          primaryBlue={primaryBlue}
        />
      )}

      <CategoriaSelectModal
        isOpen={fase === "selecionando"}
        onCancel={() => navigate("/")}
        onConfirm={iniciarQuiz}
        primaryBlue={primaryBlue}
      />

      <ResultadoModal
        isOpen={fase === "finalizado"}
        acertos={acertos}
        total={total}
        onJogarNovamente={reiniciar}
        onVoltar={() => navigate("/")}
        primaryBlue={primaryBlue}
      />
    </div>
  );
};

export default QuizPage;
