import { Outlet } from "react-router";
import HeaderBar from "../dictionarypage/HeaderBar";

function Layout() {
  return (
    <>
      <HeaderBar />
      <Outlet />
    </>
  );
}
export default Layout;
