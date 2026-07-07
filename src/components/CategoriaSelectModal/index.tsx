import React, { useEffect, useState } from "react";
import { Modal, Button, Space, Select, Typography, Spin } from "antd";
import { categoriaService } from "../../services/categoriaService";
import type { ICategoria } from "../../types/categoria";

const { Text } = Typography;

interface CategoriaSelectModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (categoriaIds: number[]) => void;
  primaryBlue: string;
}

const CategoriaSelectModal: React.FC<CategoriaSelectModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  primaryBlue,
}) => {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [selecionadas, setSelecionadas] = useState<number[]>([]);
  const [loading, setLoading] = useState(false); // 2. Estado de loading

  useEffect(() => {
    if (!isOpen) return;
    categoriaService.getAllCategorias().then((cats) => {
      setCategorias(cats);
      setSelecionadas([]);
    });
  }, [isOpen]);

  const handleStart = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onConfirm(selecionadas);
    }, 3000);
  };

  return (
    <Modal
      title="Escolha as categorias do quiz"
      open={isOpen}
      onCancel={loading ? undefined : onCancel}
      footer={null}
      centered
      width={"50%"}
      maskStyle={{
        backgroundColor: "#152047",
      }}
    >
      {loading ? (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <Spin size="large" />
          <p style={{ marginTop: "16px", color: primaryBlue }}>
            Preparando o seu quiz...
          </p>
        </div>
      ) : (
        <>
          <Text type="secondary">
            Selecione uma ou mais categorias para montar o seu quiz.
          </Text>

          <Select
            mode="multiple"
            placeholder="Selecione"
            style={{ width: "100%", margin: "16px 0" }}
            value={selecionadas}
            onChange={setSelecionadas}
            options={categorias.map((cat) => ({
              label: cat.nome,
              value: cat.id,
            }))}
            allowClear
          />

          <div style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={onCancel}>Cancelar</Button>
              <Button
                type="primary"
                disabled={selecionadas.length === 0}
                onClick={handleStart}
                style={{
                  backgroundColor:
                    selecionadas.length === 0 ? undefined : primaryBlue,
                  borderColor:
                    selecionadas.length === 0 ? undefined : primaryBlue,
                }}
              >
                Começar
              </Button>
            </Space>
          </div>
        </>
      )}
    </Modal>
  );
};

export default CategoriaSelectModal;
