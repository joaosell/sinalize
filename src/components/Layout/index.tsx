import { Outlet, useLocation } from "react-router";
import HeaderBar from "../HeaderBar/HeaderBar";
import Footer from "../Footer";

function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f4f7f9",
      }}
    >
      {!isHomePage && <HeaderBar />}
      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isHomePage ? "20px" : "40px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
