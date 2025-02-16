import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import bg from '../assets/images/light-patten.svg'

export default function Layout() {
  return (
    <div style={{backgroundImage:`url(${bg})`}} className='flex flex-col justify-between min-h-screen'>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}
