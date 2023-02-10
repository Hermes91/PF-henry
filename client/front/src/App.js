import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/home";
import ProductDetails from "./components/productDetails/ProductDetails";
import AboutUs from "./components/AboutUs/AboutUs";
import Shop from "./components/Shop/Shop";
import Dashboard from "./components/dashboard/Dashboard";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import WishlistComponent from './components/Wishlist/wishlistComponent';

function App() {
  return (
  <PayPalScriptProvider
      options={{
        "client-id":
          "ASf_ehya4e5o-44-Fe7bkZbl3X1Er6aF3Uj5tgz31XOGe6CM6GeqAUGpuJd4dDQNJsT05SwKZRPToRFj",
      }}
    >
    <div>
      <Routes>
        <Route path="/about-us" element={<AboutUs />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/products/:productId" element={<ProductDetails />} />
      {  /*<Route path="/user" element={<UserComponent />} /> */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path='/wishlist' element={<WishlistComponent />} />
       {/* <Route path='/cart' element={<ShopCart />} />*/}

        {/* path /user para testear componentes */}
      </Routes>
    </div>
    
    </PayPalScriptProvider>
  );
}

export default App;

