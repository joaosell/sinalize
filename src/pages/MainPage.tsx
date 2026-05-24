import { Button, Col, Row, Typography } from "antd";
import sinalizeLogo from "../assets/sinalize_logo.png";
import udescLogo from "../assets/udesc_logo.png";
import { useNavigate } from "react-router";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <Row justify="center">
      <Col span={24} style={{ textAlign: "center" }}>
        <img
          style={{ maxWidth: 350, marginBottom: 50, marginTop: 50 }}
          src={sinalizeLogo}
        />

        <Row justify="center">
          <Col>
            <Button
              onClick={() => navigate("quiz")}
              style={{
                width: 220,
                height: 60,
                marginBottom: 25,
                fontSize: 22,
                backgroundColor: "#1A2D72",
                borderColor: "#1A2D72",
              }}
              type="primary"
              shape="round"
            >
              Jogar
            </Button>
          </Col>
        </Row>

        <Row justify="center">
          <Col>
            <Button
              onClick={() => navigate("dictionary")}
              style={{
                width: 220,
                height: 60,
                fontSize: 22,
                backgroundColor: "#1A2D72",
                borderColor: "#1A2D72",
              }}
              type="primary"
              shape="round"
            >
              Dicionário
            </Button>
          </Col>
        </Row>
      </Col>

      <Row justify="center" style={{ marginTop: 40 }}>
        <Col span={24} style={{ textAlign: "center" }}>
          <Typography.Text>
            Feito por João Pedro Ferreira Sell, Pedro Paoli Neto e Felipe
            Augusto Mais
          </Typography.Text>

          <Row justify="center" style={{ marginTop: 10 }}>
            <Col>
              <img style={{ maxWidth: 100 }} src={udescLogo} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
};

export default MainPage;
