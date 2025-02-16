import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy } from 'react';
import { Suspense } from 'react';
import Layout from '../src/components/Layout.jsx';
import Home from '../src/components/Home.jsx';
import Login from '../src/components/Login.jsx';
import Register from '../src/components/Register.jsx';
import Products from '../src/components/Products.jsx';
import Categories from '../src/components/Categories.jsx';
const Brand = lazy(() => import('./../src/components/Brand.jsx'));
import Notfound from '../src/components/Notfound.jsx';
import Cart from './components/Cart.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import Loading from './components/Loading.jsx';
import WishList from './components/WishList.jsx';
import ForgetPassword from './components/ForgetPassword.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import UpdateUserPassword from './components/UpdateUserPassword.jsx';
import VerifyResetCode from './components/VerifyResetCode.jsx';



export default function App() {
  const routes = createBrowserRouter([
    {path:'/',element:<Layout></Layout>,children:[
      {index:true,element:<Home></Home>},
      {path:'/login',element:<Login></Login>},
      {path:'/register',element:<Register></Register>},
      {path:'/forgetPassword',element:<ForgetPassword></ForgetPassword>},
      {path:'/resetPassword',element:<ResetPassword></ResetPassword>},
      {path:'/updateUserPassword',element:<UpdateUserPassword></UpdateUserPassword>},
      {path:'/verifyResetCode',element:<VerifyResetCode></VerifyResetCode>},
      {path:'/products',element:<Products></Products>},
      {path:'/productdetails/:id/:catId',element:<ProductDetails></ProductDetails>},
      {path:'/categories',element:<Categories></Categories>},
      {path:'/wishlist',element:<WishList></WishList>},
      {path:'/brand',element:<Suspense fallback={<Loading></Loading>}><Brand></Brand></Suspense>},
      {path:'/cart',element:<ProtectedRoute><Cart></Cart></ProtectedRoute>},
      {path:'*',element:<Notfound></Notfound>}
    ]}
  ])

  return (
    <>
        <RouterProvider router={routes}/>
    </>
  )
}
