import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Register = ({ setRegisterModal, setTokenState, setConnectModal }) => {
  // form states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  // state to display error message if form fields are not all filled
  const [errorMissing, setErrorMissing] = useState(false);
  // state to display message is mail is already in db
  const [errorExisting, setErrorExisting] = useState(false);
  // state of checkbox label
  const [check, setCheck] = useState(false);

  // fonction on Register submission
  const handleSubmitRegister = (event) => {
    console.log(event.target);
    event.preventDefault();

    if (!username || !email || !password) {
      setErrorMissing(true);
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "https://lereacteur-vinted-api.herokuapp.com/user/signup",
            {
              email: email,
              username: username,
              password: password,
              newsletter: newsletter,
            }
          );

          alert("Bienvenue sur Vinted, votre compte est activé");
          const token = response.data.token;
          setTokenState(true);
          Cookies.set("token", token, { expires: 7 });
          setErrorMissing(false);
          setErrorExisting(false);
          setRegisterModal(false);
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
      <section className="registerModal">
        <div className="modal">
          <p
            className="cross"
            onClick={() => {
              setRegisterModal(false);
            }}
          >
            X
          </p>
          <h2>S'inscrire</h2>
          <form onSubmit={handleSubmitRegister}>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              name="username"
              className="username"
              onChange={(event) => {
                const value = event.target.value;
                setUsername(value);
              }}
              value={username}
            />
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
                Cet Email existe déjà, veuillez vous connecter
              </p>
            )}
            <div>
              <input
                id="newsletter"
                type="checkbox"
                name="checkbox"
                className="checkboxinput"
                checked={newsletter}
                onChange={(event) => {
                  const value = event.target.value;
                  setNewsletter(!newsletter);
                }}
              />
              <label
                htmlFor="newsletter"
                onClick={() => {
                  setCheck(!check);
                }}
              >
                <div className={`box ${check && "green"}`}></div>
                <p>S'inscrire à notre newsletter</p>
              </label>
            </div>
            <p className="conditions">
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
            <input type="submit" value="S'inscrire" />
            <p
              onClick={() => {
                setRegisterModal(false);
                setConnectModal(true);
              }}
            >
              Tu as déjà un compte ? Connecte-toi !
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
