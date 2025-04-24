import "./App.css";
import BackgroundPoly from "./components/reusable/Background/backgroundPoly";
import Routing from "./Routing";
import Heading from "./components/sections/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { CartProvider } from "./components/pages/Cart/CartContext";

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

    </>
  );
}

export default App;
