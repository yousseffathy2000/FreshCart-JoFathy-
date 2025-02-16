import { Link } from 'react-router-dom'
import logo from '../assets/images/freshcart-logo.svg'

export default function Footer() {
  return (
    <footer className=" rounded-lg shadow-sm m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src={logo} className="" alt="FreshCart Logo"/>
          </Link>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a target="_blank" href="https://www.linkedin.com/in/youssef-fathy-195ba61a4?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BihNHjjP1R9KY5WV3GDR%2BXg%3D%3D" className="hover:underline">Youssef Fathy</a>. All Rights Reserved.</span>
      </div>
    </footer>
  )
}
