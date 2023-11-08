import { Link } from "react-router-dom";

const Offer = ({ data }) => {
  return (
    <>
      <section>
        <div className="container">
          <h1>Ceci est la page Offer</h1>
          <Link to="/">Retourner à l'accueil</Link>
        </div>
      </section>
    </>
  );
};

export default Offer;
