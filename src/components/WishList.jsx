import { Helmet } from "react-helmet";
import useQueryWishlist, { getWishList } from "./hooks/useQueryWishlist";
import Loading from "./Loading.jsx";
import toast from "react-hot-toast";
import useMutationCart, { addToCart } from "./hooks/useMutationCart";
import EmptyCart from '../assets/images/Empty Cart.png';
import useMutationWishList, { deleteWishList } from "./hooks/useMutationWishList";
import { useContext, useEffect } from "react"; // أضف useEffect
import { numWishItem } from "./Context/NumWishList";

export default function WishList() {
    let { setWishList } = useContext(numWishItem);
    const { data, isLoading, isFetching } = useQueryWishlist(getWishList);
    const { data: datacart, mutate: mutatecart, error: errorcart, isError: isErrorcart, isSuccess: isSuccesscart } = useMutationCart(addToCart);
    let { data: deletedata, mutate: mutatedelete, isPending: isPendingdelete, isFetching: isFetchingdelete, isLoading: isLoadingdelete, isSuccess: isSuccessdelete } = useMutationWishList(deleteWishList);

    // استخدم useEffect لتحديث حالة السياق بعد التصيير
    useEffect(() => {
        if (data?.data?.count) {
            setWishList(data.data.count);
        }
    }, [data, setWishList]);

    if (isLoading || isFetching || isPendingdelete || isFetchingdelete || isLoadingdelete) {
        return <Loading />;
    }

    if (isSuccessdelete) {
        toast.success(deletedata?.data?.message);
    }

    if (isSuccesscart) {
        toast.success(datacart?.data?.message);
    }

    if (isErrorcart) {
        toast.error(errorcart?.response?.data?.message);
    }

    if (!data?.data?.count) {
        return (
            <div className="flex justify-center items-center h-screen">
                <img className="w-80" src={EmptyCart} alt="Empty Cart" />
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Fresh Cart / Wish List</title>
            </Helmet>

            <div className="container">
                <h1 className="text-center text-green-color my-5 text-4xl font-semibold">Wish List</h1>
                <h1 className="font-bold my-10">Number of Wish List Item: <span className="text-green-color font-bold">{data?.data?.count}</span> </h1>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <tbody>
                        {data?.data?.data.map((wish) => (
                            <tr key={wish?.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                <td className="p-4">
                                    <img src={wish?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={wish?.name} />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {wish?.title}
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {wish?.price} EGP
                                </td>
                                <td className="px-6 py-4">
                                    <a
                                        onClick={() => mutatecart(wish?.id)}
                                        href="#"
                                        className="font-medium text-white bg-green-color p-3 rounded hover:underline hover:text-white hover:animate-pulse cursor-pointer"
                                    >
                                        <i className="fa-solid fa-plus"></i>
                                    </a>
                                </td>
                                <td className="px-6 py-4">
                                    <a
                                        href="#"
                                        onClick={() => { mutatedelete(wish?.id) }}
                                        className="font-medium text-white bg-red-400 p-3 rounded hover:underline hover:text-white hover:animate-pulse cursor-pointer"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}