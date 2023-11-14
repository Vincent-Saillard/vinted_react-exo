import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CheckoutForm = () => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const userId = Cookies.get("userId");
  console.log(userId);

  const stripe = useStripe();
  const elements = useElements();

  const location = useLocation();
  const navigate = useNavigate();
  //   console.log(location);
  const offersData = location.state.data;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsWaiting(true);
      // Retrieving input content
      const cardElement = elements.getElement(CardElement);
      // Sending informations to stripe to validate card
      const stripeResponse = await stripe.createToken(cardElement, {
        name: userId,
      });
      //   console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;

      // sending request to backend with stripeToken

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: offersData.product_name,
          amount: offersData.product_price,
        }
      );

      // if answer is successfull a message appears on user screen and button disappears otherwise button is available again
      if (response.data.status === "succeeded") {
        setSucceeded(true);
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else {
        setIsWaiting(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Résumé de la commande</h1>
        <div className="blockText">
          <div className="inline">
            <p>Commande</p>
            <p>{`${offersData.product_price.toFixed(2)} €`}</p>
          </div>
          <div className="inline">
            <p>Frais protection acheteurs</p>
            <p>0.40 €</p>
          </div>
          <div className="inline">
            <p>Frais de port</p>
            <p>0.80 €</p>
          </div>
        </div>
        <div className="line"></div>
        <div className="blockText">
          <div className="inline total">
            <p>Total</p>
            <p>{`${(offersData.product_price + 1.2).toFixed(2)} €`}</p>
          </div>
          <p>
            {"Il ne vous reste plus qu'une étape pour vous offrir "}
            <span>{offersData.product_name}</span>
            {". Vous allez payer "}
            <span>{`${(offersData.product_price + 1.2).toFixed(2)} €`}</span>
            {" (frais de protection et frais de port inclus)."}
          </p>
          <div className="line"></div>
          <div className="blockCard">
            <CardElement />
          </div>
          {succeeded ? (
            <p className="succeedMessage">
              Votre paiement est validé, vous allez être automatiquement
              redirigé(e) vers la page d'accueil du site.
            </p>
          ) : (
            <input
              type="submit"
              value="Pay"
              disabled={isWaiting}
              className={isWaiting ? "waiting" : "pay"}
              id="pay"
            />
          )}
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
