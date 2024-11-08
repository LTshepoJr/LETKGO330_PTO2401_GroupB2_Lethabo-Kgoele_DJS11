import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./mainComp.css";

const MainPage = () => {
  return (
    <div className="mainPage">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
