import { useState } from "react";
import { useParams } from "react-router-dom";

import Register from "../components/Register";
import Connect from "../components/Connect";

// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

const Offer = ({
  data,
  setTokenState,
  setRegisterModal,
  setConnectModal,
  registerModal,
  connectModal,
}) => {
  const { id } = useParams();

  // get index of object in data from id of params
  const idList = data.offers.map((elem) => elem._id);

  const index = idList.indexOf(id);

  // state to determine url for main pic
  const [picLink, setPicLink] = useState(0);

  return (
    <>
      <section className="offer">
        <div className="container">
          <div className="pictures">
            <img
              src={data.offers[index].product_pictures[picLink].secure_url}
              alt=""
            />
            <div className="mini">
              {data.offers[index].product_pictures.map((url, index2) => {
                return (
                  <img
                    src={url.secure_url}
                    onClick={() => {
                      setPicLink(index2);
                    }}
                    key={index2}
                  />
                );
              })}
            </div>
          </div>

          <div className="informations">
            <div>
              <p className="price">{`${data.offers[index].product_price.toFixed(
                1
              )} €`}</p>

              {data.offers[index].product_details.map((detail, index2) => {
                return (
                  <div className="detail" key={index2}>
                    <p className="detail-key">{Object.keys(detail)[0]}</p>
                    <p className="detail-value">{Object.values(detail)[0]}</p>
                  </div>
                );
              })}

              <div className="border"></div>

              <p className="title">{data.offers[index].product_name}</p>
              <p className="description">
                {data.offers[index].product_description}
              </p>

              <div className="user">
                {data.offers[index].owner.account.avatar ? (
                  <img
                    src={data.offers[index].owner.account.avatar.secure_url}
                    alt="user profile picture"
                    className="userpic"
                  />
                ) : (
                  <div className="usernopic">
                    {data.offers[index].owner.account.username[0].toUpperCase()}
                  </div>
                )}

                <p className="username">
                  {data.offers[index].owner.account.username}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                alert("Le produit a bien été ajouté à votre panier.");
              }}
            >
              Acheter
            </button>
          </div>
        </div>
      </section>

      {/*  Register Modal */}
      {/*  Register Modal */}
      {/*  Register Modal */}

      {registerModal && (
        <Register
          setRegisterModal={setRegisterModal}
          setTokenState={setTokenState}
          setConnectModal={setConnectModal}
        />
      )}

      {/*  Login Modal */}
      {/*  Login Modal */}
      {/*  Login Modal */}

      {connectModal && (
        <Connect
          setConnectModal={setConnectModal}
          setTokenState={setTokenState}
          setRegisterModal={setRegisterModal}
        />
      )}
    </>
  );
};

export default Offer;
