import React, { useEffect, useState } from "react";
import { Modal, Button, Space, Select, Typography } from "antd";
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
  const [selecionadas, setSelecionadas] = useState<number[]>([1]);

  useEffect(() => {
    if (!isOpen) return;
    categoriaService.getAllCategorias().then((cats) => {
      setCategorias(cats);
      setSelecionadas([]);
    });
  }, [isOpen]);

  return (
    <Modal
      title="Escolha as categorias do quiz"
      open={isOpen}
      onCancel={onCancel}
      footer={null}
    >
      <Text type="secondary">
        Selecione uma ou mais categorias para montar o seu quiz.
      </Text>

      <Select
        mode="multiple"
        placeholder="Selecione uma ou mais categorias"
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
            // disabled={selecionadas.length === 0} (ver como corrigir o style)
            onClick={() => onConfirm(selecionadas)}
            style={{ backgroundColor: primaryBlue, borderColor: primaryBlue }}
          >
            Começar
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default CategoriaSelectModal;
