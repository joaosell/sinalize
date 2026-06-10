import { Button, Col, Row } from "antd";
import sinalizeLogo from "../assets/sinalize_logo.png";
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
    </Row>
  );
};

export default MainPage;
