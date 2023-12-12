import Home from "./pages/home";
import Navbar from "./components/navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Register from "./pages/register";
import ProductDetail from "./pages/productDetail";
import Payment from "./pages/payment";
import Account from "./pages/account";
import History from "./pages/history";

function App() {

  const name = localStorage.getItem('name')

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
          element: name && <Cart />
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
          path: '/account/:id',
          element: name && <Account />
        },
        {
          path: '/history/:id',
          element: name && <History />
        },
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

  ]);

  return <RouterProvider router={router} />

}
export default App