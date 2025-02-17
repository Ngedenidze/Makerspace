import "./App.css";
import Navbar from "./components/Navbar";
import BackgroundPoly from "./components/reusable/Background/backgroundPoly";
import Routing from "./components/Routing";
function App() {
  return (
    <>
    <BackgroundPoly />
      <Navbar />
      <Routing />
    </>
  );
}

export default App;
