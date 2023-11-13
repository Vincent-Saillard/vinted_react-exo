import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Publish.css";

const Publish = ({ setConnectModal, setOnHome, tokenState }) => {
  setOnHome(false);
  const navigate = useNavigate();

  // states form
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [isok, setIsok] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [exchange, setExchange] = useState(false);

  // state for cloudinary pic's url
  const [pictureFromCloudinary, setPictureFromCloudinary] = useState();

  // state error message (missing fields in form)
  const [errorDisplay, setErrorDisplay] = useState(false);

  // onsubmit function
  const handleSubmit = async (event) => {
    event.preventDefault();
    // display error message if every field is not filled
    if (
      !picture ||
      !title ||
      !description ||
      !brand ||
      !size ||
      !color ||
      !isok ||
      !location ||
      !price
    ) {
      setErrorDisplay(true);
    } else {
      setErrorDisplay(false);
      try {
        // console.log(Object.values(event.target[0].files));
        const picArray = Object.values(event.target[0].files);

        const formData = new FormData();
        for (let i = 0; i < picArray.length; i++) {
          formData.append("picture", picArray[i]);
        }
        formData.append("title", title);
        formData.append("description", description);
        formData.append("brand", brand);
        formData.append("size", size);
        formData.append("color", color);
        formData.append("condition", isok);
        formData.append("city", location);
        formData.append("price", price);
        formData.append("exchange", exchange);

        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
          formData,
          {
            headers: {
              Authorization: `Bearer ${tokenState}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response);
        setPictureFromCloudinary(response.data.product_pictures);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // If user clicks on disconnect button in Header he will be redireted automatically on HomePage
  return (
    <>
      {tokenState ? (
        <div className="publish">
          <div className="container">
            <h1>Vends ton article</h1>
            <form onSubmit={handleSubmit}>
              <div className="blockform">
                <div className="borders">
                  {pictureFromCloudinary && (
                    <div className="picBlock">
                      {pictureFromCloudinary.map((picture) => {
                        return (
                          <img
                            src={picture.secure_url}
                            alt=""
                            className="cloudinaryPic"
                            key={picture.secure_url}
                          />
                        );
                      })}
                    </div>
                  )}
                  <label className="productPic" htmlFor="productPic">
                    <p className="plus">+</p>
                    <p>Ajoute une photo</p>
                  </label>
                  <input
                    id="productPic"
                    type="file"
                    multiple={true}
                    onChange={(event) => {
                      setPicture(event.target.files[0]);
                    }}
                  />
                </div>
              </div>

              <div className="blockform">
                <div className="inline">
                  <label htmlFor="title">Titre</label>
                  <input
                    id="title"
                    type="text"
                    placeholder="ex: Chemise Sézane verte"
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                  />
                </div>
                <div className="line"></div>
                <div className="inline">
                  <label htmlFor="description">Décris ton article</label>
                  <textarea
                    id="description"
                    placeholder="ex: porté quelquefois, taille correctement"
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="blockform">
                <div className="inline">
                  <label htmlFor="brand">Marque</label>
                  <input
                    id="brand"
                    type="text"
                    placeholder="ex: Zara"
                    value={brand}
                    onChange={(event) => {
                      setBrand(event.target.value);
                    }}
                  />
                </div>
                <div className="line"></div>
                <div className="inline">
                  <label htmlFor="size">Taille</label>
                  <input
                    id="size"
                    type="text"
                    placeholder="ex: L / 40 / 12"
                    value={size}
                    onChange={(event) => {
                      setSize(event.target.value);
                    }}
                  />
                </div>
                <div className="line"></div>
                <div className="inline">
                  <label htmlFor="color">Couleur</label>
                  <input
                    id="color"
                    type="text"
                    placeholder="ex: Fushia"
                    value={color}
                    onChange={(event) => {
                      setColor(event.target.value);
                    }}
                  />
                </div>
                <div className="line"></div>
                <div className="inline">
                  <label htmlFor="state">État</label>
                  <input
                    id="state"
                    type="text"
                    placeholder="ex: neuf avec étiquette"
                    value={isok}
                    onChange={(event) => {
                      setIsok(event.target.value);
                    }}
                  />
                </div>
                <div className="line"></div>
                <div className="inline">
                  <label htmlFor="location">Lieu</label>
                  <input
                    id="location"
                    type="text"
                    placeholder="ex: Paris"
                    value={location}
                    onChange={(event) => {
                      setLocation(event.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="blockform">
                <div className="inline">
                  <label htmlFor="price">Prix</label>
                  <input
                    id="price"
                    type="number"
                    placeholder="0,00 €"
                    value={price}
                    onChange={(event) => {
                      setPrice(event.target.value);
                    }}
                  />
                </div>
                <div className="inline">
                  <div className="empty"></div>
                  <div className="exchange">
                    <input
                      id="exchange"
                      type="checkbox"
                      checked={exchange}
                      onChange={() => {
                        setExchange(!exchange);
                      }}
                    />
                    <label htmlFor="exchange">
                      Je suis intéressé(e) par les échanges
                    </label>
                  </div>
                </div>
              </div>
              {errorDisplay && (
                <p className="error-message">
                  Veuillez remplir tous les champs
                </p>
              )}
              <div className="last">
                <input type="submit" value="Ajouter" className="submit" />
              </div>
            </form>
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default Publish;
