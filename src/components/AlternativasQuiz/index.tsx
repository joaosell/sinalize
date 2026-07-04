import React from "react";
import { Col, Row } from "antd";

export interface OpcaoQuiz {
  id: number;
  palavra: string;
}

interface AlternativasQuizProps {
  opcoes: OpcaoQuiz[];
  idCorreto: number;
  idSelecionado: number | null;
  desabilitado: boolean;
  onSelecionar: (opcao: OpcaoQuiz) => void;
  primaryBlue: string;
}

const AlternativasQuiz: React.FC<AlternativasQuizProps> = ({
  opcoes,
  idCorreto,
  idSelecionado,
  desabilitado,
  onSelecionar,
  primaryBlue,
}) => {
  const corDaOpcao = (opcao: OpcaoQuiz): string => {
    if (!desabilitado) return primaryBlue;
    if (opcao.id === idCorreto) return "#2d6a4f";
    if (opcao.id === idSelecionado) return "#b5302a";
    return primaryBlue;
  };

  return (
    <Row gutter={[16, 16]}>
      {opcoes.map((opcao) => {
        const cor = corDaOpcao(opcao);
        return (
          <Col xs={24} sm={12} key={opcao.id}>
            <button
              onClick={() => !desabilitado && onSelecionar(opcao)}
              disabled={desabilitado}
              style={{
                width: "100%",
                minHeight: 60,
                padding: "12px 20px",
                borderRadius: 12,
                border: "none",
                background: cor,
                color: "#fff",
                fontSize: 18,
                fontWeight: 600,
                cursor: desabilitado ? "default" : "pointer",
                opacity: desabilitado && cor === primaryBlue ? 0.6 : 1,
                transition: "background 0.3s, opacity 0.3s",
              }}
            >
              {opcao.palavra}
            </button>
          </Col>
        );
      })}
    </Row>
  );
};

export default AlternativasQuiz;
