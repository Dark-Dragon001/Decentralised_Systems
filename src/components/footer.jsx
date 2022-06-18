import "./footer.css";

const Footer = () => {
  return(
      <>
              <div className="footerHrContainer">
                  <hr/>
              </div>
              <div className="paragraphsContainer">
                  <p className="productsParagraph">
                      Goods requsted by the contractor are: {}
                  </p>
                  <p className="productsParagraph">
                      Goods size requsted by the contractor are: {}
                  </p>
                  <p className="productsParagraph">
                      Goods quality requsted by the contractor are: {}
                  </p>
              </div>
      </>
  );
}


export default Footer;