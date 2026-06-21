import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Space } from "antd";
import type { ICategoria } from "../../types/categoria";

interface CategoriaModalProps {
  isOpen: boolean;
  editingCategoria: ICategoria | null;
  onCancel: () => void;
  onSave: (values: { nome: string; descricao: string }) => void;
  primaryBlue: string;
}

const CategoriaModal: React.FC<CategoriaModalProps> = ({
  isOpen,
  editingCategoria,
  onCancel,
  onSave,
  primaryBlue,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      if (editingCategoria) {
        form.setFieldsValue({
          nome: editingCategoria.nome,
          descricao: editingCategoria.descricao,
        });
      } else {
        form.resetFields();
      }
    }
  }, [editingCategoria, isOpen, form]);

  return (
    <Modal
      title={editingCategoria ? "Editar Categoria" : "Criar Nova Categoria"}
      open={isOpen}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onSave}>
        <Form.Item
          name="nome"
          label="Nome da Categoria"
          rules={[{ required: true, message: "Por favor, digite o nome da categoria!" }]}
        >
          <Input placeholder="Digite aqui o nome da categoria..." />
        </Form.Item>

        <Form.Item
          name="descricao"
          label="Descrição"
          rules={[{ required: true, message: "Por favor, digite a descrição!" }]}
        >
          <Input.TextArea
            placeholder="Digite uma descrição para a categoria..."
            rows={3}
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
              {editingCategoria ? "Salvar Alterações" : "Adicionar"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoriaModal;
