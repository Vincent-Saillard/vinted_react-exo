import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Stripe content
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Le Reacteur pk, replace if you are using your backend
const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

import "../Payement/Payment.css";
import CheckoutForm from "../../components/CheckoutForm";

const Payment = ({ tokenState }) => {
  const navigate = useNavigate();

  return (
    <>
      {tokenState ? (
        <div className="payment">
          <div className="container">
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default Payment;
