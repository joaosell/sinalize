import React from "react";
import { Col, Space, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Word } from "../../pages/DictionaryPage";

const { Text } = Typography;

interface WordCardProps {
  item: Word;
  primaryBlue: string;
  onEdit: (word: Word) => void;
  onDelete: (id: number) => void;
}

const WordCard: React.FC<WordCardProps> = ({
  item,
  primaryBlue,
  onEdit,
  onDelete,
}) => {
  return (
    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
      <div
        style={{
          backgroundColor: primaryBlue,
          color: "#fff",
          padding: "12px 16px",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Text style={{ color: "#fff", fontSize: "16px" }}>{item.palavra}</Text>
        <Space size="small">
          <EditOutlined
            onClick={() => onEdit(item)}
            style={{ cursor: "pointer", fontSize: "14px" }}
          />
          <DeleteOutlined
            onClick={() => onDelete(item.id)}
            style={{ cursor: "pointer", fontSize: "14px", color: "#ff4d4f" }}
          />
        </Space>
      </div>
    </Col>
  );
};

export default WordCard;
