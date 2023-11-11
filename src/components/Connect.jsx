import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

const Connect = ({ setConnectModal, setTokenState, setRegisterModal }) => {
  // form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // state to display error message if form fields are not all filled
  const [errorMissing, setErrorMissing] = useState(false);
  // state to display message is mail is already in db
  const [errorExisting, setErrorExisting] = useState(false);
  // state of checkbox label

  // function on Connect submission
  const handleSubmitConnect = (event) => {
    console.log(event);
    event.preventDefault();

    if (!email || !password) {
      setErrorMissing(true);
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "https://lereacteur-vinted-api.herokuapp.com/user/login",
            {
              email: email,
              password: password,
            }
          );

          const token = response.data.token;
          setTokenState(true);
          Cookies.set("token", token, { expires: 7 });
          setErrorMissing(false);
          setErrorExisting(false);
          setConnectModal(false);
        } catch (error) {
          console.log(error);
          if (error.response.data.message === "Bad Request") {
            setErrorExisting(true);
          }
        }
      };
      fetchData();
    }
  };

  return (
    <>
      <section className="connexionModal">
        <div className="modal">
          <p
            className="cross"
            onClick={() => {
              setConnectModal(false);
            }}
          >
            X
          </p>
          <h2>Se connecter</h2>
          <form onSubmit={handleSubmitConnect}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="email"
              value={email}
              onChange={(event) => {
                const value = event.target.value;
                setEmail(value);
              }}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              name="password"
              className="password"
              value={password}
              onChange={(event) => {
                const value = event.target.value;
                setPassword(value);
              }}
            />
            {errorMissing && (
              <p className="onmissing">Tous les champs doivent être remplis</p>
            )}
            {errorExisting && (
              <p className="existing">
                L'Email ou le mot de passe sont incorrects, avez-vous un compte
                ?
              </p>
            )}
            <input type="submit" value="Se connecter" />
            <p
              onClick={() => {
                setRegisterModal(true);
                setConnectModal(false);
              }}
            >
              Pas encore de compte ? Inscris-toi !
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Connect;
