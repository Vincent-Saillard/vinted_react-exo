import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
// Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer";

import "./App.css";

const App = () => {
  // data state will contains data received from server
  const [data, setData] = useState();
  // isLoading state allow us to know when answer from server has arrived
  const [isLoading, setIsLoading] = useState(true);
  // register modal state
  const [registerModal, setRegisterModal] = useState(false);
  // connexion modal state
  const [connectModal, setConnectModal] = useState(false);
  // token state
  const [tokenState, setTokenState] = useState(
    Cookies.get("token") ? true : false
  );
  // search bar input state
  const [searchQuery, setSearchQuery] = useState("");
  // ordering filter state , false = ascendent, true = descendant
  const [orderFilter, setOrderFilter] = useState(false);
  let sorted = "price-asc";
  if (orderFilter) {
    sorted = "price-desc";
  } else {
    sorted = "price-asc";
  }
  // min value state starting at 10 by default
  const [minSort, setMinSort] = useState(10);
  // max value state starting at 100 by default
  const [maxSort, setMaxSort] = useState(100);

  // Slider component states
  const [minValue, set_minValue] = useState(0);
  const [maxValue, set_maxValue] = useState(100);
  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  // state on home page or not
  const [onHome, setOnHome] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery) {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?sort=${sorted}&title=${searchQuery}&priceMin=${minValue}&priceMax=${maxValue}`
        );
        setData(response.data);
        setIsLoading(false);
      } else {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?sort=${sorted}&priceMin=${minValue}&priceMax=${maxValue}`
        );
        setData(response.data);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchQuery, orderFilter, minValue, maxValue]);

  return isLoading ? (
    <p>Your content is loading, please wait.</p>
  ) : (
    <>
      <Router>
        <Header
          setSearchQuery={setSearchQuery}
          setConnectModal={setConnectModal}
          setRegisterModal={setRegisterModal}
          tokenState={tokenState}
          setTokenState={setTokenState}
          setOrderFilter={setOrderFilter}
          orderFilter={orderFilter}
          setMinSort={setMinSort}
          setMaxSort={setMaxSort}
          minSort={minSort}
          maxSort={maxSort}
          minValue={minValue}
          maxValue={maxValue}
          set_minValue={set_minValue}
          set_maxValue={set_maxValue}
          handleInput={handleInput}
          onHome={onHome}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                data={data}
                connectModal={connectModal}
                setConnectModal={setConnectModal}
                registerModal={registerModal}
                setRegisterModal={setRegisterModal}
                setTokenState={setTokenState}
                searchQuery={searchQuery}
                setOnHome={setOnHome}
              />
            }
          />
          <Route
            path="/offer/:id"
            element={
              <Offer
                data={data}
                setConnectModal={setConnectModal}
                setRegisterModal={setRegisterModal}
                setTokenState={setTokenState}
                registerModal={registerModal}
                connectModal={connectModal}
                setOnHome={setOnHome}
              />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
