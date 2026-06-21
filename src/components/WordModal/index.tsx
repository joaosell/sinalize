import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Space, Select } from "antd";
import type { IPalavra } from "../../types/palavra";
import type { ICategoriaResumida } from "../../types/categoria";

interface WordModalProps {
  isOpen: boolean;
  editingWord: IPalavra | null;
  onCancel: () => void;
  onSave: (values: { palavra: string; categoryIds?: number[] }) => void;
  primaryBlue: string;
  categories?: ICategoriaResumida[];
}

const WordModal: React.FC<WordModalProps> = ({
  isOpen,
  editingWord,
  onCancel,
  onSave,
  primaryBlue,
  categories,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      if (editingWord) {
        form.setFieldsValue({
          palavra: editingWord.palavra,
          categoryIds: editingWord.categorias.map((c) => c.id),
        });
      } else {
        form.resetFields();
      }
    }
  }, [editingWord, isOpen, form]);

  return (
    <Modal
      title={editingWord ? "Editar Palavra" : "Criar Nova Palavra"}
      open={isOpen}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onSave}>
        <Form.Item
          name="palavra"
          label="Nome da Palavra"
          rules={[{ required: true, message: "Por favor, digite a palavra desejada!" }]}
        >
          <Input placeholder="Digite aqui a sua palavra..." />
        </Form.Item>

        <Form.Item name="categoryIds" label="Categorias da Palavra">
          <Select
            mode="multiple"
            placeholder="Selecione uma ou mais categorias"
            options={(categories ?? []).map((cat) => ({
              label: cat.nome,
              value: cat.id,
            }))}
            allowClear
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
          <Space>
            <Button onClick={onCancel}>Cancelar</Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: primaryBlue, borderColor: primaryBlue }}
            >
              {editingWord ? "Salvar Alterações" : "Adicionar"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WordModal;
