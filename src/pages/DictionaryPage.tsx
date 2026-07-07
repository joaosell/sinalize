import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Space,
  Typography,
  Modal,
  Input,
  Segmented,
  Dropdown,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";

import AlphabetFilter from "../components/AlphabetFilter";
import WordCard from "../components/WordCard";
import CategoriaCard from "../components/CategoriaCard";
import WordModal from "../components/WordModal";
import CategoriaModal from "../components/CategoriaModal";
import { palavraService } from "../services/palavraService";
import { categoriaService } from "../services/categoriaService";
import type { IPalavra } from "../types/palavra";
import type { ICategoria } from "../types/categoria";

const { Text } = Typography;

type ActiveSegment = "Palavras" | "Categorias";

const DictionaryPage: React.FC = () => {
  const [palavras, setPalavras] = useState<IPalavra[]>([]);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [activeSegment, setActiveSegment] = useState<ActiveSegment>("Palavras");

  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [ordenacao, setOrdenacao] = useState<string>("asc");

  const [activeModal, setActiveModal] = useState<"word" | "category" | null>(
    null,
  );
  const [editingWord, setEditingWord] = useState<IPalavra | null>(null);
  const [editingCategoria, setEditingCategoria] = useState<ICategoria | null>(
    null,
  );

  const primaryBlue = "#1d2c60";
  const grayBackground = "#e5e5e5";

  const carregarPalavras = () =>
    palavraService.getAllPalavras().then(setPalavras);
  const carregarCategorias = () =>
    categoriaService.getAllCategorias().then(setCategorias);

  useEffect(() => {
    carregarPalavras();
    carregarCategorias();
  }, []);

  const handleSegmentChange = (value: string) => {
    setActiveSegment(value as ActiveSegment);
    setSelectedLetter(null);
    setSearchTerm("");
    if (value === "Categorias") {
      carregarCategorias();
    }
  };

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(selectedLetter === letter ? null : letter);
  };

  const openWordModal = (word: IPalavra | null = null) => {
    setEditingWord(word);
    setActiveModal("word");
  };

  const openCategoryModal = (categoria: ICategoria | null = null) => {
    setEditingCategoria(categoria);
    setActiveModal("category");
  };

  const closeModal = () => {
    setActiveModal(null);
    setEditingWord(null);
    setEditingCategoria(null);
  };

  const sortWords = (a: IPalavra, b: IPalavra) => {
    if (ordenacao === "asc") return a.palavra.localeCompare(b.palavra);
    if (ordenacao === "desc") return b.palavra.localeCompare(a.palavra);
    if (ordenacao === "recentes") return b.id - a.id;
    return 0;
  };

  const sortCategorias = (a: ICategoria, b: ICategoria) => {
    if (ordenacao === "asc") return a.nome.localeCompare(b.nome);
    if (ordenacao === "desc") return b.nome.localeCompare(a.nome);
    if (ordenacao === "recentes") return b.id - a.id;
    return 0;
  };

  const filteredWords = palavras
    .filter((word) => {
      const matchesSearch = word.palavra
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesLetter = selectedLetter
        ? word.palavra.toLowerCase().startsWith(selectedLetter.toLowerCase())
        : true;
      return matchesSearch && matchesLetter;
    })
    .sort((a, b) => sortWords(a, b));

  const filteredCategorias = categorias
    .filter((cat) => {
      const matchesSearch = cat.nome
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesLetter = selectedLetter
        ? cat.nome.toLowerCase().startsWith(selectedLetter.toLowerCase())
        : true;
      return matchesSearch && matchesLetter;
    })
    .sort((a, b) => sortCategorias(a, b));

  const handleSaveWord = async (values: {
    palavra: string;
    categoryIds?: number[];
  }) => {
    try {
      if (editingWord) {
        await palavraService.editPalavra(editingWord.id, {
          palavra: values.palavra,
          categoryIds: values.categoryIds,
        });
      } else {
        await palavraService.createPalavra({
          palavra: values.palavra,
          categoryIds: values.categoryIds ?? [],
        });
      }
      carregarPalavras();
    } catch (e) {
      alert(e);
    }
    closeModal();
  };

  const handleSaveCategory = async (values: {
    nome: string;
    descricao: string;
  }) => {
    try {
      if (editingCategoria) {
        await categoriaService.editCategoria(editingCategoria.id, {
          nome: values.nome,
          descricao: values.descricao,
        });
      } else {
        await categoriaService.createCategoria({
          nome: values.nome,
          descricao: values.descricao,
        });
      }
      carregarCategorias();
    } catch (e) {
      alert(e);
    }
    closeModal();
  };

  const handleDeleteWord = (id: number) => {
    Modal.confirm({
      title: "Deseja realmente excluir esta palavra?",
      okText: "Sim, excluir",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: () =>
        palavraService.deletePalavra(id).then(carregarPalavras).catch(alert),
    });
  };

  const handleDeleteCategoria = (id: number) => {
    Modal.confirm({
      title: "Deseja realmente excluir esta categoria?",
      okText: "Sim, excluir",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: () =>
        categoriaService
          .deleteCategoria(id)
          .then(carregarCategorias)
          .catch(alert),
    });
  };

  const isCategoriasView = activeSegment === "Categorias";
  const displayedCount = isCategoriasView
    ? filteredCategorias.length
    : filteredWords.length;
  const totalCount = isCategoriasView ? categorias.length : palavras.length;

  return (
    <>
      <div style={{ width: "100%", boxSizing: "border-box" }}>
        <div style={{ marginTop: "2vh" }}>
          <Segmented
            size="large"
            options={["Palavras", "Categorias"]}
            value={activeSegment}
            onChange={handleSegmentChange}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Input
            placeholder="Pesquisar"
            prefix={<SearchOutlined style={{ color: "#aaa", marginLeft: 5 }} />}
            style={{
              borderRadius: "20px",
              width: "50vh",
              padding: 5,
              margin: "2vh",
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
          />
        </div>

        <AlphabetFilter
          grayBackground={grayBackground}
          primaryBlue={primaryBlue}
          selectedLetter={selectedLetter}
          onLetterClick={handleLetterClick}
        />

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
              onClick={() =>
                isCategoriasView ? openCategoryModal() : openWordModal()
              }
              style={{
                borderRadius: "20px",
                background: grayBackground,
                border: "none",
                fontWeight: "500",
              }}
            >
              {isCategoriasView ? "Criar categoria" : "Criar palavra"}
            </Button>
          </Space>
          <Space align="center" size="middle">
            <Text style={{ fontWeight: "500" }}>
              Exibindo {displayedCount} de {totalCount}
            </Text>
            <Dropdown
              menu={{
                items: [
                  { key: "asc", label: "A-Z" },
                  { key: "desc", label: "Z-A" },
                  { key: "recentes", label: "Mais recentes" },
                ],
                onClick: (e) => setOrdenacao(e.key),
              }}
              placement="bottomRight"
            >
              <Button
                icon={<SortAscendingOutlined />}
                style={{
                  borderRadius: "20px",
                  background: grayBackground,
                  border: "none",
                  fontWeight: "500",
                }}
              >
                Ordenar
              </Button>
            </Dropdown>
          </Space>
        </div>

        {displayedCount === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            {isCategoriasView
              ? "Nenhuma categoria encontrada com os filtros informados!"
              : "Nenhuma palavra encontrada com os filtros informados!"}
          </div>
        )}

        {!isCategoriasView && (
          <Row gutter={[12, 12]} style={{ width: "100%", margin: 0 }}>
            {filteredWords.map((item) => (
              <WordCard
                key={item.id}
                item={item}
                primaryBlue={primaryBlue}
                onEdit={openWordModal}
                onDelete={handleDeleteWord}
              />
            ))}
          </Row>
        )}

        {isCategoriasView && (
          <Row gutter={[12, 12]} style={{ width: "100%", margin: 0 }}>
            {filteredCategorias.map((item) => (
              <CategoriaCard
                key={item.id}
                item={item}
                primaryBlue={primaryBlue}
                onEdit={openCategoryModal}
                onDelete={handleDeleteCategoria}
              />
            ))}
          </Row>
        )}

        {displayedCount > 24 && (
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
        editingWord={editingWord}
        onCancel={closeModal}
        onSave={handleSaveWord}
        primaryBlue={primaryBlue}
        categories={categorias.map((c) => ({
          id: c.id,
          nome: c.nome,
          descricao: c.descricao,
        }))}
      />

      <CategoriaModal
        isOpen={activeModal === "category"}
        editingCategoria={editingCategoria}
        onCancel={closeModal}
        onSave={handleSaveCategory}
        primaryBlue={primaryBlue}
      />
    </>
  );
};

export default DictionaryPage;
