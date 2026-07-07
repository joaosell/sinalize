import { Layout, Typography, Space } from "antd";
import udescLogo from "../../assets/udesc_logo.png";

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter
      style={{
        backgroundColor: "#152047",
        padding: "24px 20px",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "800px",
          margin: "0 auto",
          gap: "10px",
        }}
      >
        <Space align="center" size="middle">
          <img
            src={udescLogo}
            alt="UDESC Logo"
            style={{ height: "67px", opacity: 0.9 }}
          />
          <Typography.Text
            style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "15px" }}
          >
            <strong>Sinalize</strong> • Informática na Educação
          </Typography.Text>
        </Space>

        <Typography.Text
          style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "13px" }}
        >
          UDESC - Centro de Ciências Tecnológicas
        </Typography.Text>
      </div>
    </AntFooter>
  );
}

export default Footer;
