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

  useEffect(() => {
    const fetchData = async () => {
      console.log(searchQuery);
      if (searchQuery) {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${searchQuery}`
        );
        setData(response.data);
        setIsLoading(false);
      } else {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers`
        );
        setData(response.data);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchQuery]);

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
          searchQuery={searchQuery}
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
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
