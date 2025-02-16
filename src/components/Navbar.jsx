import { useContext } from 'react';
import logo from '../assets/images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { userToken } from './Context/UserToken';
import { numItem } from './Context/NumberCartContext';
import { numWishItem } from './Context/NumWishList';

export default function Navbar() {
  let {isLogin, setLogin} = useContext(userToken);
      let {wishListNum} = useContext(numWishItem)
  
    let {cartNum} = useContext(numItem)
  let navigate = useNavigate()
  
  function logOut(){
    localStorage.removeItem('token')
    setLogin(null)
    navigate('/')
  }
  return (
  <nav className="bg-light-color border-gray-200 dark:bg-gray-900">
    <div className="max-w-screen-xl flex flex-wrap justify-between xl:justify-start items-center mx-auto p-4">
      <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse xl:w-[15%]">
        <img src={logo} className="" alt="FreshCart Logo" />
      </Link>
      <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-xl xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div className="hidden xl:flex xl:justify-between w-[85%]" id="navbar-default">
        <ul className="font-medium flex flex-col p-4 xl:p-0 mt-4   xl:flex-row xl:space-x-8 rtl:space-x-reverse xl:mt-0 xl:border-0 ">
          <li>
            <Link to="/" className="block text-gray-500 py-2 px-3 rounded xl:bg-transparent xl:p-0 transition-all duration-300 hover:text-green-color">Home</Link>
          </li>
          <li>
            <Link to="/products" className="block text-gray-500 py-2 px-3 rounded xl:bg-transparent xl:p-0 transition-all duration-300 hover:text-green-color">Products</Link>
          </li>
          {isLogin &&
          <>
          <li className='relative'>
            <Link to="/cart" className="block text-gray-500 py-2 px-3 rounded xl:bg-transparent xl:p-0 transition-all duration-300 hover:text-green-color">
              Cart <i className='fa-solid fa-shopping-cart'></i>
              {cartNum > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-green-color text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartNum}
                </span>
              )}
            </Link>
          </li>
          <li className='relative'>
            <Link to="/wishlist" className="block text-gray-500 py-2 px-3 rounded xl:bg-transparent xl:p-0 transition-all duration-300 hover:text-green-color">
              Wish List <i className='fa-solid fa-shopping-cart'></i>
              {wishListNum > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-green-color text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {wishListNum}
                </span>
                )}
            </Link>
          </li></>}
          <li>
            <Link to="/categories" className="block text-gray-500 py-2 px-3 rounded xl:bg-transparent xl:p-0 transition-all duration-300 hover:text-green-color">Categories</Link>
          </li>
          <li>
            <Link to="/brand" className="block text-gray-500 py-2 px-3 rounded xl:bg-transparent xl:p-0 transition-all duration-300 hover:text-green-color">Brands</Link>
          </li>
        </ul>
        <ul className="font-medium flex flex-col p-4 xl:p-0 mt-4 xl:flex-row xl:space-x-8 rtl:space-x-reverse xl:mt-0 xl:border-0">
          <li>
            <a href="#" className="block text-gray-500 py-2 px-3 rounded xl:bg-transparent xl:p-0 transition-all duration-300 hover:text-green-color"><i className="fa-brands fa-instagram"></i></a>
          </li>
          <li>
            <a href="#" className="block text-gray-500 py-2 px-3 rounded xl:bg-transparent xl:p-0 transition-all duration-300 hover:text-green-color"><i className="fa-brands fa-facebook"></i></a>
          </li>
          <li>
            <a href="#" className="block text-gray-500 py-2 px-3 rounded xl:bg-transparent xl:p-0 transition-all duration-300 hover:text-green-color"><i className="fa-brands fa-tiktok"></i></a>
          </li>
          <li>
            <a href="#" className="block text-gray-500 py-2 px-3 rounded xl:bg-transparent xl:p-0 transition-all duration-300 hover:text-green-color"><i className="fa-brands fa-twitter"></i></a>
          </li>
          <li>
            <a href="#" className="block text-gray-500 py-2 px-3 rounded xl:bg-transparent xl:p-0 transition-all duration-300 hover:text-green-color"><i className="fa-brands fa-linkedin"></i></a>
          </li>
          <li>
            <a href="#" className="block text-gray-500 py-2 px-3 rounded xl:bg-transparent xl:p-0 transition-all duration-300 hover:text-green-color"><i className="fa-brands fa-youtube"></i></a>
          </li>

          {isLogin ?  <li onClick={logOut} className='cursor-pointer'>
            <span className="block text-gray-500 py-2 px-3 rounded xl:bg-transparent xl:p-0 transition-all duration-300 hover:text-green-color">LogOut</span>
          </li> :
          <>
              <li>
            <Link to="/login" className="block text-gray-500 py-2 px-3 rounded xl:bg-transparent xl:p-0 transition-all duration-300 hover:text-green-color">Login</Link>
          </li>
          <li>
            <Link to="/register" className="block text-gray-500 py-2 px-3 rounded xl:bg-transparent xl:p-0 transition-all duration-300 hover:text-green-color">Register</Link>
          </li>
          </>}
        </ul>
      </div>
    </div>
  </nav>
  )
}
