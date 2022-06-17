import Harvest_Page from "./pages/harvestpage";
import Header from "./components/header";
import "./App.css";
import Footer from "./components/footer";

function App() {
  return (
      <>
          <div className="App">
              <header className="headerContainer">
                  <Header />
              </header>
              <Harvest_Page />

              <footer className="footerContainer">
                  <Footer />
              </footer>

          </div>

      </>

  );
}

export default App;
//0x02B8E8b07b8c77054E70D9A8b784D1D856868b94 contract address.