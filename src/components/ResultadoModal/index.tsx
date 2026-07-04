import React from "react";
import { Button, Modal, Typography } from "antd";

const { Title } = Typography;

interface ResultadoModalProps {
  isOpen: boolean;
  acertos: number;
  total: number;
  onJogarNovamente: () => void;
  onVoltar: () => void;
  primaryBlue: string;
}

const mensagemPorDesempenho = (acertos: number, total: number): string => {
  const proporcao = total > 0 ? acertos / total : 0;
  if (proporcao === 1) return "Perfeito!";
  if (proporcao >= 0.7) return "Muito bem!";
  if (proporcao >= 0.4) return "Foi quase!";
  return "Continue praticando!";
};

const ResultadoModal: React.FC<ResultadoModalProps> = ({
  isOpen,
  acertos,
  total,
  onJogarNovamente,
  onVoltar,
  primaryBlue,
}) => {
  return (
    <Modal open={isOpen} footer={null} closable={false} centered>
      <div style={{ textAlign: "center", padding: "16px 8px" }}>
        <Title level={3} style={{ marginBottom: 24 }}>
          {mensagemPorDesempenho(acertos, total)}
        </Title>

        <div
          style={{
            background: "#2d6a4f",
            color: "#fff",
            fontSize: 22,
            fontWeight: 600,
            padding: "12px 24px",
            borderRadius: 999,
            display: "inline-block",
            marginBottom: 28,
          }}
        >
          {acertos} / {total} corretas
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            shape="round"
            onClick={onJogarNovamente}
            style={{
              width: 220,
              height: 44,
              fontSize: 16,
              backgroundColor: primaryBlue,
              borderColor: primaryBlue,
            }}
          >
            Jogar novamente
          </Button>
          <Button
            type="primary"
            shape="round"
            onClick={onVoltar}
            style={{
              width: 220,
              height: 44,
              fontSize: 16,
              backgroundColor: primaryBlue,
              borderColor: primaryBlue,
            }}
          >
            Voltar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ResultadoModal;
