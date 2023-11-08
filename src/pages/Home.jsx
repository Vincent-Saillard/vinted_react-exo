import { Link } from "react-router-dom";

const Home = ({ data }) => {
  return (
    <>
      <main>
        <div className="container">
          <h1>Ceci est la page Home</h1>
          <Link to="/Offer/X"> Cliquer pour rejoindre la page Offer</Link>
        </div>
      </main>
    </>
  );
};

export default Home;
