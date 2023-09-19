import { useContext } from "react";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import MyAccount from "./pages/MyAccount";
import MyOrders from "./pages/MyOrders";
import SignOut from "./pages/SignOut";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import OrderView from "./pages/OrderView";
import "./App.css";
import Specifications from "./pages/Specifications";
import { ProductProvider } from "./context/ProductContext";
import {
  ShoppingCartContext,
  ShoppingCartProvider,
} from "./context/ShoppingContext";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import { UserContext, UserProvider } from "./context/UserContext";

function AppRoutes() {
  const { isUserSignOut } = useContext(ShoppingCartContext);
  const { user } = useContext(UserContext);
  console.log("user", user);
  let routes = useRoutes([
    {
      path: "/",
      element: !isUserSignOut ? <Home /> : <Navigate replace to={"/sign-in"} />,
    },
    {
      path: "/cart",
      element: !isUserSignOut ? <Cart /> : <Navigate replace to={"/sign-in"} />,
    },
    {
      path: "/spefications/:id",
      element: !isUserSignOut ? (
        <Specifications />
      ) : (
        <Navigate replace to={"/sign-in"} />
      ),
    },
    {
      path: "/my-account",
      element: <MyAccount />,
    },
    {
      path: "/my-orders/last",
      element: <OrderView />,
    },
    {
      path: "/my-orders/:id",
      element: <OrderView />,
    },
    {
      path: "/my-order",
      element: <OrderView />,
    },
    {
      path: "/my-orders",
      element: <MyOrders />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/sign-out",
      element: <SignOut />,
    },
    {
      path: "/*",
      element: <NotFound />,
    },
  ]);
  return routes;
}
function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <ShoppingCartProvider>
          <BrowserRouter>
            <Navbar />
            <Layout>
              <AppRoutes />
            </Layout>
          </BrowserRouter>
        </ShoppingCartProvider>
      </ProductProvider>
    </UserProvider>
  );
}

export default App;
