import React from "react";
import { Layout, Button, Modal, Space } from "antd";
import { HomeOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import udescLogoWhite from "../../assets/sinalize_logo_white.png";

const { Header } = Layout;
const { confirm } = Modal;

const HeaderBar: React.FC = () => {
  const primaryBlue = "#1d2c60";
  const navigate = useNavigate();

  const mostrarConfirmacaoVoltar = () => {
    confirm({
      title: "Deseja voltar ao menu principal?",
      icon: <ExclamationCircleOutlined />,
      content: "Ao sair, o progresso desta sessão será perdido.",
      okText: "Sair",
      okType: "danger",
      cancelText: "Continuar",
      onOk() {
        navigate("/");
      },
    });
  };

  return (
    <Header
      style={{
        backgroundColor: primaryBlue,
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        padding: "0 30px",
        height: "90px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div style={{ justifySelf: "start" }}>
        <Button
          type="text"
          shape="round"
          size="large"
          onClick={mostrarConfirmacaoVoltar}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "500",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <HomeOutlined style={{ fontSize: "20px" }} />
          Menu
        </Button>
      </div>

      <div style={{ justifySelf: "end" }}>
        <img
          src={udescLogoWhite}
          alt="UDESC Logo"
          style={{
            height: "80px",
            opacity: 0.95,
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
          }}
        />
      </div>
    </Header>
  );
};

export default HeaderBar;