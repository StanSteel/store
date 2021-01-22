import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import Button from "../components/Button";
import SeeMoreProducts from "../components/SeeMoreProducts";
import FilterColors from "../components/FilterColors";
import Review from "../components/Review";
import WriteReview from "../components/WriteReview";
import Container from "../components/Container";
import UtilsBlock from "../components/UtilsBlock";
import AddToCart from "../components/AddToCart";

import { createProduct, getProduct } from "../firebase/db";
import useStorage from "../storage";
import addFavorites from "../assets/addFavorites.svg";
import productPhoto from "../assets/product-image-big.jpg";

import "./ProductPage.css";

const ProductPage = (props) => {
  const [state, dispatch] = useStorage();
  const [download, setDownload] = useState(false);
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const { id } = useParams();

  let {
    title = "No title Entered",
    desc: description = "No description entered",
    photoUrls: [
      mainPhoto = "https://via.placeholder.com/800",
      ...restPhotos
    ] = [],
    colors = [],
    price = 0,
    sizes = [],
  } = product;

  useEffect(() => {
    const productFromState = state.products.find((product) => {
      return product.id === id;
    });
    if (productFromState) {
      console.log("found in local state");
      setProduct(productFromState);
    } else {
      setDownload(true);
      getProduct(id)
        .then((doc) => {
          console.log(doc.data());
          setProduct(doc.data());
          setDownload(false);
        })
        .catch((error) => {
          setError(error.message);
          setDownload(false);
        });
    }
  }, [id]);
  //   createProduct(
  //     `Self Lacing Battery Shoes
  //     mmid iately show that`,
  //     `The Nike Air Zoom SuperRep 2 is designed for circuit training, HIIT and other fast-paced exercise. Layers of support team up with Zoom Air cushioning to keep your foot locked in and comfortable as you lunge, jump and push your way through every rep.`,
  //     125
  //   );

  return (
    <div className="product-page">
      <Container>
        <UtilsBlock share />

        {download ? (
          <h1>Downloading</h1>
        ) : error ? (
          <div styles={{ fontSize: "1.5rem", color: "red" }}>{error}</div>
        ) : (
          <div className="product-page-content">
            <section className="product-page-photo-block">
              <div className="product-page-photo">
                <img src={mainPhoto} alt="product" />
              </div>
              <div className="hide-scroll-top">
                <div className="hide-scroll">
                  <div className="carousel">
                    {/* <div className=" carousel-photo active">
                      <img src={productPhoto} alt="product carousel" />
                    </div> */}
                    {console.log(product.photoUrls)}
                    {product?.photoUrls?.map((photoUrl) => {
                      return (
                        <div
                          key={photoUrl.slice(-5)}
                          className="carousel-photo "
                        >
                          <img src={photoUrl} alt="product" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <SeeMoreProducts />
            </section>
            {/* product-page-photo block end */}
            <section className="product-page-desc-block">
              <h1 className="product-page-price">{price}$</h1>

              <h2 className="product-page-title">{title}</h2>
              <p className="product-page-desc">
                {/* The Nike Air Zoom SuperRep 2 is designed for circuit training,
                HIIT and other fast-paced exercise. Layers of support team up
                with Zoom Air cushioning to keep your foot locked in and
                comfortable as you lunge, jump and push your way through every
                rep. */}
                {description}
              </p>

              {
                /* sizes block */
                sizes.length > 0 && (
                  <div className="product-page-sizes">
                    <div className="sub-block">
                      <span className="sub-block-title">sizes</span>
                      <span className="sub-block-guide">
                        <a href="#">Size guide</a>
                      </span>
                    </div>
                    <div className="sizes-self">
                      {
                        <>
                          <div className="row">
                            {sizes.map((size) => {
                              return (
                                <div className="size">
                                  <span>{size}</span>
                                </div>
                              );
                            })}
                          </div>
                          <div className="row">
                            {/* {sizes.slice(5).map((size) => {
                          return (
                            <div className="size">
                              <span>{size}</span>
                            </div>
                          );
                        })} */}
                          </div>
                        </>
                      }
                    </div>
                  </div>
                )
              }

              {/* colors block */}
              {colors.length > 0 && (
                <div className="product-page-colors">
                  <div className="sub-block">
                    <span className="sub-block-title">Colors</span>
                  </div>
                  <FilterColors
                    style={{ padding: "7%", marginRight: "7%" }}
                    colors={colors}
                  />
                </div>
              )}

              {/* Add to cart or save block */}
              <div className={"product-page-actions"}>
                <AddToCart productId={id} />

                <Button type="big secondary rounded" text="add to Favorites" />
              </div>

              {/* Reviews block */}
              <div className="product-page-reviews">
                <WriteReview id={id} />
                <Review />
                <Review />
              </div>
            </section>
            {/* product-page-desc end */}
          </div>
        )}
      </Container>
    </div>
  );
};

export default ProductPage;

const sizes = [
  "32/21",
  "32/21",
  "32/21",
  "32/21",
  "32/21",
  "32/21",
  "32/21",
  "32/21",
  "32/21",
  "32/21",
];
