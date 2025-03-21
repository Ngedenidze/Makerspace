import "./App.css";
import BackgroundPoly from "./components/reusable/Background/backgroundPoly";
import Routing from "./components/Routing";
import Heading from "./components/sections/headingPages/Heading";
import ScrollToTop from "./components/ScrollToTop";
import { QueryClient, QueryClientProvider } from 'react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Make sure to create and configure this file

const queryClient = new QueryClient();

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ScrollToTop />
      {/* background image */}
      <BackgroundPoly />
      {/* page layout */}
      <div className="layout-container">
        {/* side navigation */}
        <aside className="header-menu">
          <Heading />
        </aside>
        {/* main content */}
        <QueryClientProvider client={queryClient}>
          <main className="main-content">
            <Routing />
          </main>
        </QueryClientProvider>
      </div>
    </I18nextProvider>
  );
}

export default App;
