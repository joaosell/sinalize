import React, { useState } from "react";
import { Button, Typography, Modal, Space, Divider } from "antd";
import {
  PlayCircleOutlined,
  BookOutlined,
  InfoCircleOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import sinalizeLogo from "../assets/sinalize_logo.png";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const primaryBlue = "#1d2c60";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    height: "70px",
    fontSize: "22px",
    fontWeight: "bold",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const iconStyle: React.CSSProperties = {
    position: "absolute",
    left: "24px",
    fontSize: "28px",
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .page-transition {
            animation: fadeUp 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
          }

          .sinalize-btn {
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
          }
          
          .sinalize-btn:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 12px 24px rgba(29, 44, 96, 0.25) !important;
          }
        `}
      </style>

      <div
        className="page-transition"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          width: "100%",
          paddingTop: "4vh",
          paddingBottom: "4vh",
        }}
      >
        <img
          src={sinalizeLogo}
          alt="Sinalize Logo"
          style={{
            width: "420px",
            marginBottom: "50px",
            filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.05))",
          }}
        />

        <Space direction="vertical" size="large" style={{ width: "380px" }}>
          <Button
            className="sinalize-btn"
            type="primary"
            shape="round"
            onClick={() => navigate("/quiz")}
            style={{ ...buttonStyle, backgroundColor: primaryBlue }}
          >
            <PlayCircleOutlined style={iconStyle} />
            <span>Jogar</span>
          </Button>

          <Button
            className="sinalize-btn"
            type="primary"
            shape="round"
            onClick={() => navigate("/dictionary")}
            style={{ ...buttonStyle, backgroundColor: primaryBlue }}
          >
            <BookOutlined style={iconStyle} />
            <span>Dicionário</span>
          </Button>

          <Button
            className="sinalize-btn"
            type="default"
            shape="round"
            onClick={showModal}
            style={{
              ...buttonStyle,
              fontSize: "20px",
              color: primaryBlue,
              borderColor: primaryBlue,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <InfoCircleOutlined style={iconStyle} />
            <span>Sobre o Projeto</span>
          </Button>
        </Space>

        <Modal
          title={
            <Typography.Title
              level={4}
              style={{ color: primaryBlue, margin: 0 }}
            >
              Sobre o Projeto
            </Typography.Title>
          }
          open={isModalOpen}
          onOk={handleClose}
          onCancel={handleClose}
          centered
          footer={[
            <Button
              key="fechar"
              type="primary"
              shape="round"
              onClick={handleClose}
              style={{ backgroundColor: primaryBlue }}
            >
              Fechar
            </Button>,
          ]}
        >
          <Typography.Paragraph
            style={{
              fontSize: "16px",
              marginTop: "20px",
              textAlign: "justify",
            }}
          >
            O software <strong>Sinalize</strong> foi desenvolvido como proposta
            de projeto da matéria Informática na Educação, do curso de
            Tecnologia em Análise e Desenvolvimento de Sistemas, na UDESC.
          </Typography.Paragraph>

          <Divider style={{ margin: "16px 0" }} />

          <Typography.Text
            strong
            style={{ fontSize: "16px", display: "block", marginBottom: "12px" }}
          >
            Alunos responsáveis pelo desenvolvimento do projeto:
          </Typography.Text>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginLeft: "8px",
            }}
          >
            <Typography.Text style={{ fontSize: "15px", color: "#333" }}>
              Pedro Paoli Neto
            </Typography.Text>
            <Typography.Text style={{ fontSize: "15px", color: "#333" }}>
              João Pedro Ferreira Sell
            </Typography.Text>
            <Typography.Text style={{ fontSize: "15px", color: "#333" }}>
              Felipe Augusto Mais
            </Typography.Text>
          </div>

          <Divider style={{ margin: "16px 0" }} />

          <Typography.Text
            strong
            style={{ fontSize: "16px", display: "block", marginBottom: "12px" }}
          >
            Acesso aos repositórios:
          </Typography.Text>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginLeft: "8px",
            }}
          >
            <Typography.Link
              href="https://github.com/joaosell/sinalize"
              target="_blank"
              style={{
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: primaryBlue,
              }}
            >
              <GithubOutlined style={{ fontSize: "20px", color: "#000" }} />{" "}
              Front-end (React)
            </Typography.Link>

            <Typography.Link
              href="https://github.com/paoli2004/sinalize-back"
              target="_blank"
              style={{
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: primaryBlue,
              }}
            >
              <GithubOutlined style={{ fontSize: "20px", color: "#000" }} />{" "}
              Back-end (NestJS)
            </Typography.Link>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default MainPage;
