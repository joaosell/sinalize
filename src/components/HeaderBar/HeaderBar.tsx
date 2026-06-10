import React from "react";
import { Layout, Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const { Header } = Layout;

const HeaderBar: React.FC = () => {
  const primaryBlue = "#1d2c60";
  const navigate = useNavigate();
  return (
    <Header
      style={{
        backgroundColor: primaryBlue,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 24px",
      }}
    >
      <Button
        type="text"
        icon={
          <HomeOutlined
            style={{ fontSize: "24px", color: "#fff" }}
            onClick={() => navigate("/")}
          />
        }
      />

      <div style={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}>
        LOGO
      </div>
    </Header>
  );
};

export default HeaderBar;
