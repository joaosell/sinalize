import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Space } from 'antd';
import type { Word } from '../../pages/DictionaryPage';

interface WordModalProps {
  isOpen: boolean;
  editingWord: Word | null;
  onCancel: () => void;
  onSave: (values: { text: string }) => void; // Ajustado para wordText combinando com o name do Form.Item
  primaryBlue: string;
  keyWord: string; // Ex: "Palavra" ou "Categoria"
}

const WordModal: React.FC<WordModalProps> = ({ 
  isOpen, 
  editingWord, 
  onCancel, 
  onSave, 
  primaryBlue, 
  keyWord 
}) => {
  const [form] = Form.useForm();

  // Limpamos o useEffect: agora ele cuida apenas dos dados do formulário
  useEffect(() => {
    if (isOpen) {
      if (editingWord) {
        form.setFieldsValue({ wordText: editingWord.text });
      } else {
        form.resetFields();
      }
    }
  }, [editingWord, isOpen, form]);

  return (
    <Modal
      title={editingWord ? `Editar ${keyWord}` : `Criar Nova ${keyWord}`}
      open={isOpen}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onSave}>
        <Form.Item
          name="text"
          label={`Nome da ${keyWord}`}
          rules={[{ required: true, message: `Por favor, digite a ${keyWord.toLowerCase()} desejada!` }]}
        >
          <Input placeholder={`Digite aqui a sua ${keyWord.toLowerCase()}...`} />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
          <Space>
            <Button onClick={onCancel}>Cancelar</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: primaryBlue, borderColor: primaryBlue }}>
              {editingWord ? "Salvar Alterações" : "Adicionar"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WordModal;