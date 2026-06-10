import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Space, Select } from 'antd'; // Importe o Select
import type { Word } from '../../pages/DictionaryPage';

interface WordModalProps {
  isOpen: boolean;
  editingWord: Word | null;
  onCancel: () => void;
  onSave: (values: { text: string; categoryIds?: number[] }) => void; 
  primaryBlue: string;
  keyWord: string;
  categories?: Word[]; 
}

const WordModal: React.FC<WordModalProps> = ({ 
  isOpen, 
  editingWord, 
  onCancel, 
  onSave, 
  primaryBlue, 
  keyWord,
  categories
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      if (editingWord) {
        form.setFieldsValue({ 
          text: editingWord.text,
          categoryIds: editingWord.categoryIds || [] 
        });
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

        {keyWord === 'Palavra' && categories && (
          <Form.Item
            name="categoryIds"
            label="Categorias da Palavra"
          >
            <Select
              mode="multiple"
              placeholder="Selecione uma ou mais categorias"
              options={categories.map(cat => ({ label: cat.text, value: cat.id }))}
              allowClear
              optionFilterProp="label"
            />
          </Form.Item>
        )}

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