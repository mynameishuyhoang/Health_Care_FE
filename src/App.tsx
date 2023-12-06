import Home from "./pages/home";
import Navbar from "./components/navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Register from "./pages/register";
import ProductDetail from "./pages/productDetail";
import Payment from "./pages/payment";
import Account from "./pages/account";
import ChangePassword from "./pages/change-password";
import AuthData from "./pages/profile-auth-data";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/cart/:id',
          element: <Cart />
        },
        {
          path: '/product-detail/:id',
          element: <ProductDetail />
        },
        {
          path: '/payment',
          element: <Payment />
        },
        {
          path: '/account',
          element: <Account />
        }
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/auth-data',
      element: <AuthData />
    },
    {
      path: '/change-password',
      element: <ChangePassword />
    },
  ]);

  return <RouterProvider router={router} />

}
export default App