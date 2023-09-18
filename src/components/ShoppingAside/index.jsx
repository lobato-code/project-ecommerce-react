/* eslint-disable react/prop-types */
import "./styles.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaChevronCircleRight } from "react-icons/fa";
import { ShoppingCartContext } from "../../context";
import ShoppingCard from "../ShoppingCard";
import { v4 as uuidv4 } from "uuid";

function ShoppingAside({ closeShoppingAside, shoppingOpen }) {
  const { shoppingCart, showTotalPrice, handleCheckout } =
    useContext(ShoppingCartContext);
  const totalPrice = showTotalPrice();
  return (
    <aside
      className={`product-detail ${
        shoppingOpen ? "flex" : "hidden"
      } checkout-side-menu scrollable-cards flex-col fixed right-0 border border-gray-100 rounded-lg  bg-white px-3 z-50`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xt">My order</h2>
        <button>
          <FaChevronCircleRight onClick={() => closeShoppingAside()} />
        </button>
      </div>

      <div className="px-1 flex-1">
        {shoppingCart.length > 0 ? (
          shoppingCart.map((product) => (
            <ShoppingCard
              key={uuidv4()}
              data={product}
              keyId={product.key}
              hasCloseButton={true}
            />
          ))
        ) : (
          <p>{"No shoppping cart :("}</p>
        )}
      </div>
      <div className="px-6 mb-16">
        <p
          className={`${
            totalPrice > 0 ? "flex" : "hidden"
          }  justify-between items-center p-4`}
        >
          <span className="font-light">Total:</span>
          <span className="font-medium text-2xl">$ {totalPrice}</span>
        </p>
        <Link to="/my-orders/last">
          <button
            className="w-full bg-black py-3 text-white rounded-lg"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
}

export default ShoppingAside;
