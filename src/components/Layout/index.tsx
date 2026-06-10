import { Outlet } from "react-router";
import HeaderBar from "../HeaderBar/HeaderBar";
import Footer from "../Footer";

function Layout() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <HeaderBar />
      <main style={{ flex: 1, margin: "0 5%" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
export default Layout;
