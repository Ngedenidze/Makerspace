import "./App.css";
import BackgroundPoly from "./components/reusable/Background/backgroundPoly";
import Routing from "./components/Routing";
import Heading from "./components/sections/headingPages/Heading";
import ScrollToTop from "./components/ScrollToTop";
function App() {
  return (
    <>
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
        <main className="main-content">
          <Routing />
        </main>
      </div>
    </>
  );
}

export default App;
