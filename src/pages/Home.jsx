import { Link } from "react-router-dom";

const Home = ({ data }) => {
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
                      <p className="size">{offer.product_details[1].TAILLE}</p>
                    ) : null}
                    <p className="brand">{offer.product_details[0].MARQUE}</p>
                  </div>
                </Link>
              );
            })}
          </section>
          {/* <Link to="/Offer/X"> Cliquer pour rejoindre la page Offer</Link> */}
        </div>
      </main>
    </>
  );
};

export default Home;
