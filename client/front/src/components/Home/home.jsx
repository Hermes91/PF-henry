import { React } from "react";
import Navbar from "../NavBar/NavBar";
import Carousel from "../Carousel/carousel";
import ProdHome from "./prodHome";
import s from "../Home/home.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from '../Footer/Footer';
import Contact from '../ContactForm/ContactForm';
import ShopHome from '../Home/shopHome';
import Discount from '../Discount/discount';
import { Link } from "react-router-dom";


export default function Home() {

    return (
        <div className={s.home}>
            <div className={s.nbar}>
                <Navbar />
            </div>
            <Carousel />
            <div className={s.cardsH}>
                <ProdHome id="7" name="Bromelia guzmania" s="0" />
                <ProdHome id="8" name="Bromelia lindenii" s="1" />
                <Link s={{ textDecoration: "none"}}
                to={'/wishlist'}>
                <ShopHome />
                </Link>
            </div>
            <div className={s.discount}>
                <Discount />
            </div>
            <div className={s.contact}>
                <Contact />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

