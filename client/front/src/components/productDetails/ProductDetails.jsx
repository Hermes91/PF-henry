import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
//import { useHistory } from "react-router-dom";
import style from "./ProductDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import Rating from "@mui/material/Rating";
import Card from 'react-bootstrap/Card';
import {
  getProduct,
  getReviewById,
  getAllUsers,
  postFavorite /* getClean */,
  postReview,
} from "../../redux/actions/actionIndex.js";
import React, { useEffect, useState } from "react";
import { useParams, Link, json } from "react-router-dom";
import Navbar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocalStorage } from "./useLocalStorage";
import { toast } from 'react-toastify'

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  const [cart, setCart] = useLocalStorage("cart");
  const { productId } = useParams();
  const allUsers = useSelector((state) => state.allUsers)
  const orderedChange = useSelector((state) => state.orderedChange)
  const reviews = useSelector((state) =>state.productReview)
  const orders = useSelector((state) => state.orders);
  const product = useSelector((state) => state.productDetail);
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const getRating = (rating) => {
    setRating(rating);
  };
  // const productAlreadyBought = () => {
  //   let productAlreadyBought = false;
  //   if (orders.length)
  //     productAlreadyBought = orders.find(
  //       (orders) => orders.productId === productId
  //     );
  //   return productAlreadyBought;
  // };
  const handleOwner = (id, allUsers) =>{
    for(let i = 0; i < allUsers.length; i++){
      if(allUsers[i].id === id) return allUsers[i].fullName
    }
  }

  const handleQualify = (e) => {
    const payload = {
      email: user.email,
      productId: productId,
      rating: rating,
      text: review,
    };
    if (!rating || !review) {
      toast.warn("Please write your review before submitting!",);
      return;
    }
    dispatch(postReview(payload));
    dispatch(getReviewById(productId))
    toast.success("Product review was sent successfully!");
    setRating(0);
    setReview("");
  };

  const handleQuantity = (quantity) => {
    if (quantity >= 1 && quantity <= product.stock) setQuantity(quantity);
    if (quantity === product.stock) {
      quantity = product.stock;
      toast.warn("Stock limit");
    }
  };

  // const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   const newCart = JSON.parse(localStorage.getItem("cart")).concat(cart);
  //   localStorage.setItem("cart", JSON.stringify(newCart));
  // }, [cart]);

  useEffect(() => {
    dispatch(getProduct(productId));
    dispatch(getReviewById(productId))
    dispatch(getAllUsers())
    // return () => {
    //   dispatch(getClean());
    // };
  }, [dispatch, productId]);

  return (
    <>
      <Navbar />
      <Link to={`/shop`}>
        <div className={style.backButton}>
          <h3>Back</h3>
        </div>
      </Link>

      <div className={style.detailBody}>
        <div className={style.containerP}>
          <div className={style.imagecontainer}>
            <img
              className={style.image}
              src={product?.img}
              alt={product?.name}
            />
          </div>
          <div className={style.info}>
            <div className={style.titleandwish}>
              <h2 className={style.title}>{product.name}</h2>

              <FontAwesomeIcon
                icon={faHeart}
                className={style.icon}
                onClick={() => {
                  if (isAuthenticated) {
                    dispatch(
                      postFavorite({
                        email: user.email,
                        productId: product.id,
                      })
                    );

                    toast.info("Product added to your wishlist!");
                  } else {

                    toast.warn(
                      "You must be logged in to add products to your wishlist"
                    );
                    //dispatch action addToWishList
                  }
                }}
              />
            </div>

            <div className={style.infoblockcontainer}>
              <div className={style.infoblock}>
                <p className={style.p}>
                  <span className={style.span}>
                    • <u> Code:</u>
                  </span>{" "}
                  {product?.id}
                </p>
                <p className={style.p}>
                  <span className={style.span}>
                    • <u> Height:</u>
                  </span>{" "}
                  {product?.height} cm
                </p>
                <p className={style.p}>
                  <span className={style.span}>
                    • <u> Weight:</u>
                  </span>{" "}
                  {product?.weight} gr
                </p>
                <p className={style.p}>
                  <span className={style.span}>
                    • <u>Quantity Available:</u>
                  </span>{" "}
                  {product?.stock}
                </p>
                <p className={style.price}>
                  <span className={style.span}>
                    • <u>Price:</u> $ {product?.price}
                  </span>
                </p>
                <button
                  onClick={() => handleQuantity(quantity - 1)}
                  className={style.minusBtn}
                >
                  -
                </button>
                <input className={style.input} value={quantity}></input>
                <button
                  onClick={() => handleQuantity(quantity + 1)}
                  className={style.plusBtn}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                const oldCart = JSON.parse(window.localStorage.getItem("cart"));
                const toCart = [
                  {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: quantity,
                  },
                ];
                if (oldCart === null) {
                  const toCartStringify = [...toCart];
                  console.log(toCartStringify);
                  setCart(toCartStringify);
                } else {
                  const toCartStringify = [...toCart].concat(oldCart);
                  console.log(toCartStringify);
                  console.log(JSON.parse(window.localStorage.getItem("cart")));
                  setCart(toCartStringify);
                }

                toast.info("Product added to cart!");
              }}
              className={style.myBtn}
            >
              Buy
            </button>
          </div>
        </div>
        <div className={style.containerdescription}>
          <p className={style.p}>
            <span className={style.descriptiontitle}>
              • <u>Categories:</u>
            </span>
          </p>
          <p className={style.p}>
            {product.category?.map(
              (c) => ` ${c.charAt(0).toUpperCase() + c.slice(1)} `
            )}
          </p>
        </div>
        <div className={style.containerdescription}>
          <p className={style.p}>
            <span className={style.descriptiontitle}>
              {" "}
              • <u>Description:</u>
            </span>
          </p>
          <p className={style.p}>{product?.description}</p>
        </div>

        {/* {orders?.length && productAlreadyBought() ? ( */}
        <div className={style.containerreview}>
          <div className={style.rating}>
            <span className={style.descriptiontitle}>
              •<u> Review:</u>
            </span>
            <Rating
              name="RateReview"
              value={rating}
              onChange={(event, newValue) => {
                getRating(newValue);
              }}
            />
            <p>Your review is {rating} stars</p>
          </div>

          <textarea
            // onChange={(e) => setReview(e.target.value)}
            onChange={(e) => setReview(e.target.value)}
            value={review}
            className={style.textarea}
            placeholder="Rate this product!"
            type="textarea"
            rows={5}
            cols={5}
            maxLength="100"
          ></textarea>

          <button
            // onClick={() => {
            //   history.goBack();
            // }}
            onClick={(e) => {
              if (!user) {
                toast.info("You must be logged in to rate this product");
              } else {
                handleQualify(e);
              }
            }}
            className={style.myBtnCalificar}
          >
            Qualify
          </button>
        </div>
        {reviews?.map((e) => (
          <Card style={{marginBottom: "1%"}} key={e.id}>
            <Card.Header as="h5">{handleOwner(e.userId, allUsers)}</Card.Header>
            <Card.Body>
              <Card.Text>
                {e.text}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
