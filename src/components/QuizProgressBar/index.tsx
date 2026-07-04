import React from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

interface QuizProgressBarProps {
  total: number;
  resultados: (boolean | null)[];
  currentIndex: number;
  primaryBlue: string;
}

const QuizProgressBar: React.FC<QuizProgressBarProps> = ({
  total,
  resultados,
  currentIndex,
  primaryBlue,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 12,
        flexWrap: "wrap",
        marginBottom: 24,
      }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const resultado = resultados[i];
        const respondido = resultado === true || resultado === false;
        const atual = i === currentIndex;

        let background = "#d9d9d9";
        if (resultado === true) background = "#2d6a4f";
        else if (resultado === false) background = "#b5302a";
        else if (atual) background = primaryBlue;

        return (
          <div
            key={i}
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              transition: "background 0.3s",
            }}
          >
            {resultado === true && <CheckOutlined />}
            {resultado === false && <CloseOutlined />}
            {!respondido && i + 1}
          </div>
        );
      })}
    </div>
  );
};

export default QuizProgressBar;
