import React, { useRef } from "react";
import { Button, Space } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface AlphabetFilterProps {
  grayBackground: string;
  primaryBlue: string;
  selectedLetter: string | null;
  onLetterClick: (letter: string) => void;
}

const AlphabetFilter: React.FC<AlphabetFilterProps> = ({
  grayBackground,
  primaryBlue,
  selectedLetter,
  onLetterClick,
}) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  //isso daqui é para os botoes de rolagem manual
  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 100;

      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "32px",
        width: "100%",
      }}
    >
      {/* Botão Esquerda */}
      <Button
        shape="circle"
        type="text"
        icon={<LeftOutlined />}
        onClick={() => handleScroll("left")}
        style={{
          background: grayBackground,
          marginRight: "8px",
          flexShrink: 0,
        }}
      />

      {/* Container das Letras */}
      <div
        ref={scrollContainerRef}
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          padding: "4px",
          maxWidth: "600px",
        }}
      >
        <Space size="small">
          {alphabet.map((letter) => {
            const isSelected = selectedLetter === letter;

            return (
              <Button
                key={letter}
                shape="circle"
                type={isSelected ? "primary" : "text"}
                onClick={() => onLetterClick(letter)}
                style={{
                  background: isSelected ? primaryBlue : grayBackground,
                  color: isSelected ? "#fff" : "#333",
                  fontWeight: "bold",
                  borderColor: isSelected ? primaryBlue : "transparent",
                }}
              >
                {letter}
              </Button>
            );
          })}
        </Space>
      </div>

      {/* Botão Direita */}
      <Button
        shape="circle"
        type="text"
        icon={<RightOutlined />}
        onClick={() => handleScroll("right")}
        style={{ background: grayBackground, marginLeft: "8px", flexShrink: 0 }}
      />
    </div>
  );
};

export default AlphabetFilter;
