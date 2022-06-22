import Header from "./components/header";
import "./App.css";
import Footer from "./components/footer";
import HarvestPage from "./pages/harvestpage";
import ProcessPage from "./pages/processpage";

function App() {
  return (
      <>
          <div className="App">
              <header className="headerContainer">
                  <Header />
              </header>

              <HarvestPage />
              <ProcessPage />

          </div>

      </>

  );
}

export default App;