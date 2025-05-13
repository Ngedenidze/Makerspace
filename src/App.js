import "./App.css";
import BackgroundPoly from "./components/reusable/Background/backgroundPoly";
import Routing from "./Routing";
import Heading from "./components/sections/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { CartProvider } from "./components/pages/Cart/CartContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App() {
  // Correctly destructure i18n from useTranslation
  const { i18n } = useTranslation();

  useEffect(() => {
    // Update the <html> lang attribute when the language changes.
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <>
      {/* <BackgroundPoly /> */}
      <div className="layout-container">
        <aside className="header-menu">
          <Heading />
        </aside>
        <QueryClientProvider client={queryClient}>
          <main className="main-content">
            <Routing />
          </main>
        </QueryClientProvider>
      </div>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default App;
