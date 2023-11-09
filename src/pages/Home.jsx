import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Home = ({
  data,
  connectModal,
  setConnectModal,
  registerModal,
  setRegisterModal,
  tokenState,
  setTokenState,
}) => {
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
          setErrorExisting(true);
        }
      };
      fetchData();
    }
  };

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
          setErrorExisting(true);
        }
      };
      fetchData();
    }
  };

  return (
    <>
      <main>
        <section className="banner">
          <img
            src="https://static.vinted.com/assets/seller-promotion/other/banner-phones-2ab679df561d617d4e0ca27f862f78cf1bfeeba70fcdaa9afc19cc0fcb102c26.jpg"
            alt="vinted fixed banner"
          />
          <img
            src="https://static.vinted.com/assets/hero-block/tear-d431548c90905ad757632e4c3075d9473e38c7c6642721efeae9413afb9387a2.svg"
            alt="hero effect"
          />
        </section>
        <div className="container">
          <div className="blocktext">
            <h1>Prêts à faire du tri dans vos placards ?</h1>
            <button>Commencer à vendre</button>
          </div>

          <section className="offers">
            {data.offers.map((offer) => {
              if (offer.owner.account.avatar) {
                return (
                  <Link
                    to={`/Offer/${offer._id}`}
                    className="link"
                    key={offer._id}
                  >
                    <div className="offerUnique">
                      <div className="user">
                        <img
                          src={offer.owner.account.avatar.secure_url}
                          alt="profile picture"
                        />
                        <p>{offer.owner.account.username}</p>
                      </div>
                      <img
                        src={offer.product_image.secure_url}
                        alt={offer.product_description}
                        className="productpic"
                      />
                      <p className="price">{`${offer.product_price.toFixed(
                        1
                      )} €`}</p>
                      {offer.product_details[1].TAILLE ? (
                        <p className="size">
                          {offer.product_details[1].TAILLE}
                        </p>
                      ) : null}
                      <p className="brand">{offer.product_details[0].MARQUE}</p>
                    </div>
                  </Link>
                );
              } else {
                return null;
              }
            })}
          </section>
        </div>

        {/*  Register Modal */}
        {/*  Register Modal */}
        {/*  Register Modal */}

        {registerModal && (
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
                  <p className="onmissing">
                    Tous les champs doivent être remplis
                  </p>
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
                    value={newsletter}
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
                  Conditions et Politique de Confidentialité de Vinted. Je
                  confirme avoir au moins 18 ans.
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
        )}

        {/*  Login Modal */}
        {/*  Login Modal */}
        {/*  Login Modal */}

        {connectModal && (
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
                  <p className="onmissing">
                    Tous les champs doivent être remplis
                  </p>
                )}
                {errorExisting && (
                  <p className="existing">
                    L'Email ou le mot de passe sont incorrects, avez-vous un
                    compte ?
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
        )}
      </main>
    </>
  );
};

export default Home;
