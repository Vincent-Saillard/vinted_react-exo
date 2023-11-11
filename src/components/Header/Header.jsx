import logo from "../../assets/img/logo.png";
import glass from "../../assets/img/glass.png";
import burger from "../../assets/img/burger.png";
import cross from "../../assets/img/cross.png";
import { Link } from "react-router-dom";

import "../Header/Header.css";
import Cookies from "js-cookie";

import { useState } from "react";

const Header = ({
  setConnectModal,
  setRegisterModal,
  tokenState,
  setTokenState,
  setSearchQuery,
  setOrderFilter,
  orderFilter,
  setMinSort,
  setMaxSort,
  minSort,
  maxSort,
}) => {
  // state for burger menu
  const [openBurger, setOpenBurger] = useState(false);

  return (
    <>
      <header>
        <div className="container">
          <div className="firstLine">
            <div
              onClick={() => {
                setConnectModal(false);
                setRegisterModal(false);
              }}
            >
              <Link to="/">
                <img src={logo} alt="vinted logo aquamarine" className="logo" />
              </Link>
            </div>
            <div className="inputs">
              <div className="research">
                <img
                  src={glass}
                  alt="magnifying glass grey"
                  className="glass"
                />
                <input
                  type="text"
                  placeholder="Recherche des articles"
                  onChange={(event) => {
                    const value = event.target.value;
                    setSearchQuery(value);
                  }}
                />
              </div>
              <div className="options">
                <div className="desc">
                  <label htmlFor="order">
                    <p>Trier par prix :</p>
                    <div className="slide">
                      {orderFilter ? (
                        <div
                          className={`symbol ${orderFilter ? "right" : "left"}`}
                        >
                          ↡
                        </div>
                      ) : (
                        <div
                          className={`symbol ${orderFilter ? "right" : "left"}`}
                        >
                          ↟
                        </div>
                      )}
                    </div>
                  </label>
                  <input
                    type="checkbox"
                    id="order"
                    onChange={() => {
                      setOrderFilter(!orderFilter);
                      console.log(orderFilter);
                    }}
                  />
                </div>
                <div className="minmax">
                  <div className="min">
                    <label htmlFor="min">{`${minSort}`}</label>
                    <input
                      type="text"
                      id="min"
                      onChange={(event) => {
                        const min = event.target.value;
                        setMinSort(min);
                        console.log(minSort);
                      }}
                    />
                  </div>
                  <div className="max">
                    <label htmlFor="max">{`${maxSort}`}</label>
                    <input
                      type="text"
                      id="max"
                      onChange={(event) => {
                        const max = event.target.value;
                        setMaxSort(max);
                        console.log(maxSort);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="connect">
              {tokenState ? null : (
                <p
                  className="buttons"
                  onClick={() => {
                    setRegisterModal(true);
                    setConnectModal(false);
                  }}
                >
                  S'inscrire
                </p>
              )}
              {tokenState ? null : (
                <p
                  className="buttons"
                  onClick={() => {
                    setConnectModal(true);
                    setRegisterModal(false);
                  }}
                >
                  Se connecter
                </p>
              )}
              {tokenState && (
                <p
                  className="disconnect"
                  onClick={() => {
                    Cookies.remove("token");
                    setTokenState(false);
                  }}
                >
                  Se déconnecter
                </p>
              )}
            </div>
            <button className="sell">Vends tes articles</button>
            <div className={`burger ${openBurger && "light"}`}>
              {!openBurger && (
                <img
                  src={burger}
                  alt="burger menu"
                  onClick={() => {
                    setOpenBurger(!openBurger);
                  }}
                />
              )}
              {openBurger && (
                <img
                  src={cross}
                  alt="burger menu"
                  onClick={() => {
                    setOpenBurger(!openBurger);
                  }}
                />
              )}
            </div>
          </div>
          {openBurger && (
            <div className="secondLine">
              {tokenState ? null : (
                <p
                  className="buttons2"
                  onClick={() => {
                    setRegisterModal(true);
                    setConnectModal(false);
                  }}
                >
                  S'inscrire
                </p>
              )}
              {tokenState ? null : (
                <p
                  className="buttons2"
                  onClick={() => {
                    setConnectModal(true);
                    setRegisterModal(false);
                  }}
                >
                  Se connecter
                </p>
              )}
              {tokenState && (
                <p
                  className="disconnect2"
                  onClick={() => {
                    Cookies.remove("token");
                    setTokenState(false);
                  }}
                >
                  Se déconnecter
                </p>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
