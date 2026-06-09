import React, { useState, useEffect } from 'react';
import { Layout, Button, Row, Space, Typography, Modal , Col} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import HeaderBar from '../components/dictionarypage/HeaderBar';
import AlphabetFilter from '../components/dictionarypage/AlphabetFilter';
import WordCard from '../components/dictionarypage/WordCard';
import WordModal from '../components/dictionarypage/WordModal';
import udescLogo from "../assets/udesc_logo.png";

const { Content } = Layout;
const { Text } = Typography;
export interface Word {
  id: number;
  text: string;
}

const DictionaryPage: React.FC = () => {

  // Tipando o array de palavras
  const [words, setWords] = useState<Word[]>([
    { id: 6, text: 'Pedro Paoli' },
    { id: 7, text: 'João Sell' },
    { id: 67, text: 'Felipe Mais' },
  ]);

  const [categories, setCategories] = useState<Word[]> ([
      { id: 6, text: 'Pedro Paoli' },
      { id: 7, text: 'João Sell' },
      { id: 67, text: 'Felipe Mais' },
  ])

  useEffect(() => {
    const carregarPalavras = async () => {
      try {
        //aqui fica a chamada pra nossa api
        const resposta = await fetch('aqui a nossa url');
        const dados = await resposta.json();
        
        
        setWords(dados);
      } catch (erro) {
        console.error("Erro ao carregar palavras:", erro);
      }
    };

    carregarPalavras();
  }, []);

  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const handleLetterClick = (letter: string) => {
    if (selectedLetter === letter) {
      setSelectedLetter(null);
    } else {
      setSelectedLetter(letter);
    }
  };

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingWord, setEditingWord] = useState<Word | null>(null);
  const [editingCategory, setEditingCategory] = useState<Word | null>(null);

  const primaryBlue = '#1d2c60';
  const grayBackground = '#e5e5e5';

  const openWordModal = (word: Word | null = null) => {
    setEditingWord(word);
    setIsModalOpen(true);
  };

  const openCategoryModal = (category: Word | null = null) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const filteredWords = words.filter(word => {
    const matchesSearch = word.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLetter = selectedLetter 
      ? word.text.toLowerCase().startsWith(selectedLetter.toLowerCase()) 
      : true;

    return matchesSearch && matchesLetter;
  });

  // Valores que vêm do Form
  const handleSaveWord = (values: { text: string }) => {
    if (editingWord) {
      setWords(words.map(w => w.id === editingWord.id ? { ...w, text: values.text } : w));
    } else {
      setWords([...words, { id: Date.now(), text: values.text }]);
    }
    setIsModalOpen(false);
  };

  const handleSaveCategory = (values: { text: string }) => {
    if (editingCategory) {
      setCategories(categories.map(w => w.id === editingCategory.id ? { ...w, text: values.text } : w));
    } else {
      setCategories([...categories, { id: Date.now(), text: values.text }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Deseja realmente excluir esta palavra?',
      okText: 'Sim, excluir',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        setWords(words.filter(w => w.id !== id));
      },
    });
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      
      <HeaderBar primaryBlue={primaryBlue} onSearch={setSearchTerm}/>

      <Content style={{ padding: '40px 60px', position: 'relative' }}>
        
        <AlphabetFilter 
          grayBackground={grayBackground} 
          primaryBlue={primaryBlue}
          selectedLetter={selectedLetter}
          onLetterClick={handleLetterClick}
        />

        {/* Barra de Ações */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Space>
            <Button icon={<PlusOutlined />} style={{ borderRadius: '20px', background: grayBackground, border: 'none', fontWeight: '500' }} onClick={() => openCategoryModal()}>
              Criar categoria
            </Button>
            <Button 
              icon={<PlusOutlined />} 
              onClick={() => openWordModal()} 
              style={{ borderRadius: '20px', background: grayBackground, border: 'none', fontWeight: '500' }}
            >
              Criar palavra
            </Button>
          </Space>
          <Text style={{ fontWeight: '500' }}>Exibindo {filteredWords.length} de {words.length}</Text>
        </div>

        {filteredWords.length == 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            Nenhuma palavra encontrada com os filtros informados!
          </div>
        )}

        {/* Grid de Palavras do componente menor */}
        <Row gutter={[24, 24]}>
          {filteredWords.map((item) => (
            <WordCard 
              key={item.id} 
              item={item} 
              primaryBlue={primaryBlue} 
              onEdit={openWordModal} 
              onDelete={handleDelete} 
            />
          ))}
        </Row>

        {/* Botão Ver Mais */}
        {filteredWords.length > 24 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <Button style={{ borderRadius: '20px', background: '#d9d9d9', border: 'none', padding: '0 40px', fontWeight: '500', fontSize: '16px', height: '40px' }}>
              Ver mais
            </Button>
          </div>
        )}

        {/* Rodapé institucional */}
        <Row justify="end" style={{ marginTop: 100 }}>{/*Descobrir como bota isso no canto*/}
            <Col>
              <img style={{ maxWidth: 100 }} src={udescLogo} />
            </Col>
        </Row>

      </Content>

      {/* Modal gerenciado externamente */}
      <WordModal 
        isOpen={isModalOpen}
        editingWord={editingWord}
        onCancel={() => setIsModalOpen(false)}
        onSave={handleSaveWord}
        primaryBlue={primaryBlue}
        keyWord='Palavra'
      />

      <WordModal 
        isOpen={isModalOpen}
        editingWord={editingCategory}
        onCancel={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        primaryBlue={primaryBlue}
        keyWord='Categoria'
      />

    </Layout>
  );
};

export default DictionaryPage;