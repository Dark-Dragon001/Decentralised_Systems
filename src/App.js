import Header from "./components/header";
import "./App.css";
import Footer from "./components/footer";
import HarvestPage from "./pages/harvestpage";

function App() {
  return (
      <>
          <div className="App">
              <header className="headerContainer">
                  <Header />
              </header>

              <HarvestPage />

          </div>

      </>

  );
}

export default App;