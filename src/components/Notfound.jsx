import { Helmet } from 'react-helmet'
import notFoundErr from '../assets/images/404NotFound.png'
export default function Notfound() {
  return (
    <>
          <Helmet>
        <title>Fresh Cart / Page Not Found</title>
      </Helmet>
          <div className="container">
      <div className="flex justify-center items-center">
        <img src={notFoundErr} className='w-fit'/>
      </div>
    </div>
    </>
  )
}
