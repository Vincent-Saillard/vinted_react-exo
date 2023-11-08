import { useState } from "react";
import { Link, useParams } from "react-router-dom";

// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

const Offer = ({ data }) => {
  const { id } = useParams();

  // get index of object in data from id of params
  const idList = data.offers.map((elem) => elem._id);

  const index = idList.indexOf(id);

  // state to determine url for main pic
  const [picLink, setPicLink] = useState(0);

  // for carousel
  // const responsive = {
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 3,
  //     slidesToSlide: 3, // optional, default to 1.
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 2,
  //     slidesToSlide: 2, // optional, default to 1.
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 1,
  //     slidesToSlide: 1, // optional, default to 1.
  //   },
  // };
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
                <img
                  src={data.offers[index].owner.account.avatar.secure_url}
                  alt="user profile picture"
                  className="userpic"
                />
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

          {/* <Carousel
            // swipeable={false}
            // draggable={false}
            // showDots={true}
            responsive={responsive}
            // ssr={true} // means to render carousel on server-side.
            // infinite={true}
            // autoPlay={this.props.deviceType !== "mobile" ? true : false}
            // autoPlaySpeed={1000}
            // keyBoardControl={true}
            // customTransition="all .5"
            // transitionDuration={500}
            // containerClass="carousel-container"
            // removeArrowOnDeviceType={["tablet", "mobile"]}
            // deviceType={this.props.deviceType}
            // dotListClass="custom-dot-list-style"
            // itemClass="carousel-item-padding-40-px"
            className="carousel"
          >
            <div>
              <img
                src="https://images1.vinted.net/t/01_001e8_rHPV45mF1pD1sbmyWfaz6GbL/f800/1699447947.jpeg?s=349ebd96c63dcf4e452a1da25a749f03d393e779"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://images1.vinted.net/t/01_001e8_rHPV45mF1pD1sbmyWfaz6GbL/f800/1699447947.jpeg?s=349ebd96c63dcf4e452a1da25a749f03d393e779"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://images1.vinted.net/t/01_001e8_rHPV45mF1pD1sbmyWfaz6GbL/f800/1699447947.jpeg?s=349ebd96c63dcf4e452a1da25a749f03d393e779"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://images1.vinted.net/t/01_001e8_rHPV45mF1pD1sbmyWfaz6GbL/f800/1699447947.jpeg?s=349ebd96c63dcf4e452a1da25a749f03d393e779"
                alt=""
              />
            </div>
          </Carousel> */}
        </div>
      </section>
    </>
  );
};

export default Offer;
