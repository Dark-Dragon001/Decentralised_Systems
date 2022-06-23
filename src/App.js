import "./App.css";
import Header from "./components/header";
import HarvestPage from "./pages/harvestpage";
import ProcessPage from "./pages/processpage";
import ShipmentPage from "./pages/shipmentpage";

function App() {
  return (
      <>
          <div className="App">
              <header className="headerContainer">
                  <Header />
              </header>

              <HarvestPage />
              <ProcessPage />
              <ShipmentPage />

          </div>

      </>

  );
}

export default App;