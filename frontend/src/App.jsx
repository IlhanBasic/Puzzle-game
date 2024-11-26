import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import GamePage from './pages/Game';
import Login from './pages/Login';
import Register from './pages/Register';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, 
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/game",
    element: <GamePage />,
    loader: () => {
      const token = Cookies.get('token');
      if (!token) {
        return { redirect: "/login" };
      }
      return null; 
    },
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
