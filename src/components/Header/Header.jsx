import logo from "../../assets/img/logo.png";
import glass from "../../assets/img/glass.png";
import { Link } from "react-router-dom";

import "../Header/Header.css";

const Header = () => {
  return (
    <>
      <header>
        <div className="container">
          <Link to="/">
            <img src={logo} alt="vinted logo aquamarine" className="logo" />
          </Link>
          <div className="inputs">
            <div className="research">
              {" "}
              <img src={glass} alt="magnifying glass grey" className="glass" />
              <input type="text" placeholder="Recherche des articles" />
            </div>
            <div className="options"></div>
          </div>
          <div className="connect">
            <p className="buttons">S'inscrire</p>
            <p className="buttons">Se connecter</p>
          </div>
          <button className="sell">Vends tes articles</button>
        </div>
      </header>
    </>
  );
};

export default Header;
