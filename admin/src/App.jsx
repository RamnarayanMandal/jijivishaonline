import './App.css';
import { Outlet, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import Header from './components/Header';

function App() {
  const location = useLocation();
  
  // Add the paths where Navbar and Header should not be shown
  const hideOnPaths = ["/","/signup"]; // Replace with actual paths
  
  const shouldHideNavbarAndHeader = hideOnPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbarAndHeader && <Header />}
      {!shouldHideNavbarAndHeader && (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <Navbar />
        </aside>
      )}
      <Outlet />
    </>
  );
}

export default App;
