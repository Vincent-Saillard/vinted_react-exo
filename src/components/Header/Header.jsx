import logo from "../../assets/img/logo.png";
import glass from "../../assets/img/glass.png";
import burger from "../../assets/img/burger.png";
import cross from "../../assets/img/cross.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

import "../Header/Header.css";
import Cookies from "js-cookie";

import { useState } from "react";

import Slider from "../Slider/Slider";

const Header = ({
  setConnectModal,
  setRegisterModal,
  tokenState,
  setTokenState,
  setSearchQuery,
  setOrderFilter,
  orderFilter,
  minValue,
  maxValue,
  set_minValue,
  set_maxValue,
  handleInput,
}) => {
  // state for burger menu
  const [openBurger, setOpenBurger] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);

  return (
    <>
      <header>
        <div className="container">
          <div className="firstLine">
            {/* logo */}
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
            {/* options */}
            {/* search bar */}
            <div className="inputs bigScreens">
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

              {location.pathname === "/" ? (
                // sort options
                <>
                  <div className="options">
                    <div className="desc">
                      <label htmlFor="order">
                        <p>Trier par prix :</p>
                        <div className="slide">
                          {orderFilter ? (
                            <div
                              className={`symbol ${
                                orderFilter ? "right" : "left"
                              }`}
                            >
                              ↡
                            </div>
                          ) : (
                            <div
                              className={`symbol ${
                                orderFilter ? "right" : "left"
                              }`}
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
                          // console.log(orderFilter);
                        }}
                      />
                    </div>
                    <div className="minmax">
                      <p>Prix entre :</p>
                      <Slider
                        minValue={minValue}
                        maxValue={maxValue}
                        set_minValue={set_minValue}
                        set_maxValue={set_maxValue}
                        handleInput={handleInput}
                      />
                    </div>
                  </div>
                </>
              ) : null}
            </div>

            {/* buttons          */}
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
                    Cookies.remove("userId");
                    setTokenState(null);
                  }}
                >
                  Se déconnecter
                </p>
              )}
            </div>
            <button
              className="sell"
              onClick={() => {
                // if user is connected with token go to Publish page , if not connect modal on
                tokenState ? navigate("/Publish") : setConnectModal(true);
              }}
            >
              Vends tes articles
            </button>
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

          {/* burger menu activated  */}
          {openBurger && (
            <div className="intermediate">
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
                      Cookies.remove("userId");
                      setTokenState(null);
                    }}
                  >
                    Se déconnecter
                  </p>
                )}
              </div>

              {/* // options on small screens
            // options on small screens
            // options on small screens */}
              <div className="inputs smallScreens">
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

                {location.pathname === "/" ? (
                  // sort options
                  <>
                    <div className="options">
                      <div className="desc">
                        <label htmlFor="order">
                          <p>Trier par prix :</p>
                          <div className="slide">
                            {orderFilter ? (
                              <div
                                className={`symbol ${
                                  orderFilter ? "right" : "left"
                                }`}
                              >
                                ↡
                              </div>
                            ) : (
                              <div
                                className={`symbol ${
                                  orderFilter ? "right" : "left"
                                }`}
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
                            // console.log(orderFilter);
                          }}
                        />
                      </div>
                      <div className="minmax">
                        <p>Prix entre :</p>
                        <Slider
                          minValue={minValue}
                          maxValue={maxValue}
                          set_minValue={set_minValue}
                          set_maxValue={set_maxValue}
                          handleInput={handleInput}
                        />
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
