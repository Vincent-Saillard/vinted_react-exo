import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Publish from "./pages/Pusblish/Publish";
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
  const token = Cookies.get("token");
  const [tokenState, setTokenState] = useState(token ? token : null);
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

  // Slider component states
  const [minValue, set_minValue] = useState(0);
  const [maxValue, set_maxValue] = useState(100);
  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

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
    <>
      <div className="loading">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p>Your content is loading, please wait.</p>
      </div>
    </>
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
          minValue={minValue}
          maxValue={maxValue}
          set_minValue={set_minValue}
          set_maxValue={set_maxValue}
          handleInput={handleInput}
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
                tokenState={tokenState}
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
              />
            }
          />
          <Route
            path="/publish"
            element={<Publish tokenState={tokenState} />}
          ></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
