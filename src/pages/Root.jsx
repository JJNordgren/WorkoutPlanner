import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import Footer from "../components/Footer";
import classes from "./Root.module.css";

function RootLayout() {
  return (
    <div className={classes.layout}>
      <MainNavigation />
      <main className={classes.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
