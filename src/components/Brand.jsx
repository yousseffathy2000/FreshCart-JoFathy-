import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Loading from './Loading';


export default function Brand() {
  function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands').then(res => res.data);
  }

  let { data, isFetching } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
  });
  return (
    <>
      <Helmet>
        <title>Fresh Cart / Brands</title>
      </Helmet>

      <div className="container">
        {isFetching && <Loading />}
        <h1 className='text-center text-green-color my-5 text-4xl font-semibold'>All Brands</h1>
        {!isFetching && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-8">
            {data?.data?.map((brand) => (
              <div 
                key={brand._id} 
                className="product shadow-xl cursor-pointer bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg block m-auto" src={brand?.image} alt={brand?.name} />
                <div className="p-5">
                  <p className="mb-2 text-2xl font-bold tracking-tight text-green-500 text-center">
                    {brand?.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
