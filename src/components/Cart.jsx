import { useEffect } from "react"; 
import useMutationCart, { clearCart, deleteItem, updateCount } from "./hooks/useMutationCart";
import useQueryCart, { getCarts } from "./hooks/useQueryCart";
import EmptyCart from '../assets/images/Empty Cart.png';
import Loading from './Loading.jsx';
import Payment from '../components/Payment.jsx';
import { useContext, useState } from "react";
import { numItem } from "./Context/NumberCartContext.jsx";
import { Helmet } from "react-helmet";

export default function Cart() {
  let { setCartNum } = useContext(numItem);
  let { data, isLoading, isFetching } = useQueryCart(getCarts);
  let { mutate, isPending } = useMutationCart(deleteItem);
  let { mutate: mutateClear, isPending: isPendingClear } = useMutationCart(clearCart);
  let { mutate: mutateUpdate, isPending: isPendingUpdate } = useMutationCart(updateCount);
  let [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (data?.data?.numOfCartItems) {
      setCartNum(data.data.numOfCartItems);
    }
  }, [data, setCartNum]);

  if (!data?.data?.numOfCartItems) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img className="w-80" src={EmptyCart} alt="" />
      </div>
    );
  }

  if (isLoading || isPending || isPendingClear || isPendingUpdate || isFetching) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-3/4 mx-auto my-5 relative overflow-x-auto sm:rounded-lg">
      <Helmet>
        <title>Fresh Cart / Cart</title>
      </Helmet>
      <h1 className="font-bold my-10">Number of Cart Item {data?.data?.numOfCartItems}</h1>
      <h1 className="font-bold my-4">Total Price <span className="text-green-color font-bold">{data?.data?.data?.totalCartPrice}</span> EGP</h1>
      <table className="shadow-lg w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.data?.products.map((prod) => (
            <tr key={prod?.product?._id} className="bg-white border-b border-gray-200 hover:bg-gray-50 ">
              <td className="p-4">
                <img src={prod?.product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={prod?.product?.name} />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {prod?.product?.title}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <button onClick={() => { mutateUpdate({ productId: prod?.product?._id, count: prod?.count - 1 }) }} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>
                  <div>
                    <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={prod?.count} required />
                  </div>
                  <button onClick={() => { mutateUpdate({ productId: prod?.product?._id, count: prod?.count + 1 }) }} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {prod?.price} EGP
              </td>
              <td className="">
                <a onClick={() => { mutate(prod?.product?._id) }} href="#" className="font-medium text-white bg-red-400 p-3 rounded dark:text-red-500 hover:underline hover:text-white cursor-pointer">Remove <i className="fa-solid fa-trash"></i></a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={mutateClear} className="bg-green-color p-4 my-10 text-white rounded-lg cursor-pointer float-right">Clear Cart</button>
      <br />
      <button onClick={() => { setOpen(!isOpen) }} className="bg-green-color p-4 my-10 text-white rounded-lg cursor-pointer">Pay Online</button>
      {isOpen && <Payment cartId={data?.data?.cartId} />}
    </div>
  );
}