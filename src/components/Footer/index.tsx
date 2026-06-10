import { Layout, Typography } from "antd";
import udescLogo from "../../assets/udesc_logo.png";

function Footer() {
  const { Footer } = Layout;

  return (
    <Footer
      style={{
        backgroundColor: "#1d2c60",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 16px",
      }}
    >
      <img src={udescLogo} alt="UDESC" style={{ maxWidth: 100 }} />
      <Typography.Text
        style={{ color: "#fff", textAlign: "center", fontSize: 13 }}
      >
        Feito por João Pedro Ferreira Sell, Pedro Paoli Neto e Felipe Augusto
        Mais
      </Typography.Text>
    </Footer>
  );
}

export default Footer;
