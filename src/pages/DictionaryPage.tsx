import React, { useEffect, useState } from "react";
import { Button, Row, Space, Typography, Modal, Input, Segmented } from "antd";
import {
  FilterOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import AlphabetFilter from "../components/AlphabetFilter";
import WordCard from "../components/WordCard";
import WordModal from "../components/WordModal";
import { palavraService } from "../services/palavraService";

const { Text } = Typography;

export interface Word {
  id: number;
  palavra: string;
  // descricao: string;
  categoryIds?: number[];
}

const DictionaryPage: React.FC = () => {
  const [palavras, setPalavras] = useState<Word[]>([]);

  const [categories, setCategories] = useState([
    { id: 1, palavra: "Engenharia" },
    { id: 2, palavra: "Tecnologia" },
  ]);

  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [activeModal, setActiveModal] = useState<"word" | "category" | null>(
    null,
  );
  const [editingItem, setEditingItem] = useState<Word | null>(null);

  const primaryBlue = "#1d2c60";
  const grayBackground = "#e5e5e5";

  const carregar = () => palavraService.getAllPalavras().then(setPalavras);

  useEffect(() => {
    carregar();
  }, []);

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(selectedLetter === letter ? null : letter);
  };

  // Funções para abrir os Modais isoladamente
  const openWordModal = (word: Word | null = null) => {
    setEditingItem(word);
    setActiveModal("word");
  };

  const openCategoryModal = (category: Word | null = null) => {
    setEditingItem(category);
    setActiveModal("category");
  };

  const closeModal = () => {
    setActiveModal(null);
    setEditingItem(null);
  };

  // Filtragem das Palavras
  const filteredWords = palavras.filter((word) => {
    const matchesSearch = word.palavra
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLetter = selectedLetter
      ? word.palavra.toLowerCase().startsWith(selectedLetter.toLowerCase())
      : true;

    return matchesSearch && matchesLetter;
  });

  const handleSaveWord = async (values: {
    palavra: string;
    categoryIds?: number[];
  }) => {
    if (editingItem) {
      setPalavras(
        palavras.map((w) =>
          w.id === editingItem.id
            ? {
                ...w,
                palavra: values.palavra,
                categoryIds: values.categoryIds || [],
              }
            : w,
        ),
      );
    } else {
      try {
        await palavraService.createPalavra({
          //arrumar os parametros depois
          palavra: values.palavra,
          categoryIds: values.categoryIds,
          descricao: "descricao teste",
        });
      } catch (e) {
        alert(e);
      }
    }
    carregar();
    closeModal();
  };

  // Salvar Categoria
  const handleSaveCategory = (values: { palavra: string }) => {
    if (editingItem) {
      // Edição
      setCategories(
        categories.map((c) =>
          c.id === editingItem.id ? { ...c, palavra: values.palavra } : c,
        ),
      );
    } else {
      // Criação
      setCategories([
        ...categories,
        { id: Date.now(), palavra: values.palavra },
      ]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Deseja realmente excluir esta palavra?",
      okText: "Sim, excluir",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        setPalavras(palavras.filter((w) => w.id !== id));
      },
    });
  };

  return (
    <>
      {/* O conteúdo principal cresce para empurrar o rodapé para baixo */}
      <div style={{ flex: 1 }}>
        <div style={{ marginTop: "2vh" }}>
          <Segmented size="large" options={["Palavras", "Categorias"]} />
        </div>
        <Input
          placeholder="Pesquisar"
          prefix={<SearchOutlined style={{ color: "#aaa", marginLeft: 5 }} />}
          style={{
            borderRadius: "20px",
            width: "50vh",
            padding: 5,
            margin: "2vh",
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
        />
        <Button shape="circle" icon={<FilterOutlined />} />
        <AlphabetFilter
          grayBackground={grayBackground}
          primaryBlue={primaryBlue}
          selectedLetter={selectedLetter}
          onLetterClick={handleLetterClick}
        />

        {/* Barra de Ações */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <Space>
            <Button
              icon={<PlusOutlined />}
              style={{
                borderRadius: "20px",
                background: grayBackground,
                border: "none",
                fontWeight: "500",
              }}
              onClick={() => openCategoryModal()}
            >
              Criar categoria
            </Button>
            <Button
              icon={<PlusOutlined />}
              onClick={() => openWordModal()}
              style={{
                borderRadius: "20px",
                background: grayBackground,
                border: "none",
                fontWeight: "500",
              }}
            >
              Criar palavra
            </Button>
          </Space>
          <Text style={{ fontWeight: "500" }}>
            Exibindo {filteredWords.length} de {palavras.length}
          </Text>
        </div>

        {filteredWords.length === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            Nenhuma palavra encontrada com os filtros informados!
          </div>
        )}

        {/* Grid de Palavras */}
        <Row gutter={[12, 12]}>
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            <Button
              style={{
                borderRadius: "20px",
                background: "#d9d9d9",
                border: "none",
                padding: "0 40px",
                fontWeight: "500",
                fontSize: "16px",
                height: "40px",
              }}
            >
              Ver mais
            </Button>
          </div>
        )}
      </div>

      <WordModal
        isOpen={activeModal === "word"}
        editingWord={editingItem}
        onCancel={closeModal}
        onSave={handleSaveWord}
        primaryBlue={primaryBlue}
        keyWord="Palavra"
        categories={categories}
      />

      <WordModal
        isOpen={activeModal === "category"}
        editingWord={editingItem}
        onCancel={closeModal}
        onSave={handleSaveCategory}
        primaryBlue={primaryBlue}
        keyWord="Categoria"
      />
    </>
  );
};

export default DictionaryPage;
