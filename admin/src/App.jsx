import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";

function App() {
  const location = useLocation();

  // Add the paths where Navbar and Header should not be shown
  const hideOnPaths = ["/", "/signup"]; // Replace with actual paths

  const shouldHideNavbarAndHeader = hideOnPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbarAndHeader && <Header />}
      <div className="flex  w-full h-full ">
        {!shouldHideNavbarAndHeader && (
          <div className=" hidden w-72  min-h-screen flex-col border-r bg-background sm:flex">
            <Navbar />
          </div>
        )}
        <Outlet />
      </div>
    </>
  );
}

export default App;
