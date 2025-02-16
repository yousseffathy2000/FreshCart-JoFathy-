import { Link } from "react-router-dom";
import useMutationCart, { addToCart } from "./hooks/useMutationCart";
import toast from "react-hot-toast";
import { useEffect, useState, useContext } from "react";
import useMutationWishList, { addToWishlist, deleteWishList } from "./hooks/useMutationWishList";
import { userToken } from "./Context/UserToken";

export default function ProductItems({ product }) {
    const { category, id, title, imageCover, price, slug, ratingsAverage, priceAfterDiscount } = product;
    let { data, mutate, error, isError, isSuccess } = useMutationCart(addToCart);
    let { mutate: mutateWishList } = useMutationWishList(addToWishlist);
    let { mutate: mutateDeleteWishList } = useMutationWishList(deleteWishList);
    let { isLogin } = useContext(userToken);

    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setIsInWishlist(wishlist.includes(id));
    }, [id]);

    const toggleWishlist = () => {
        if (isInWishlist) {
            mutateDeleteWishList(id, {
                onSuccess: () => {
                    setIsInWishlist(false);
                    toast.success("Removed from wishlist");
                    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                    localStorage.setItem('wishlist', JSON.stringify(wishlist.filter(item => item !== id)));
                },
                onError: () => {
                    toast.error("Failed to remove from wishlist");
                }
            });
        } else {
            mutateWishList(id, {
                onSuccess: () => {
                    setIsInWishlist(true);
                    toast.success("Added to wishlist");
                    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                    localStorage.setItem('wishlist', JSON.stringify([...wishlist, id]));
                },
                onError: () => {
                    toast.error("Failed to add to wishlist");
                }
            });
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.data?.message);
        } else if (isError) {
            toast.error(error?.response?.data?.message);
        }
    }, [isSuccess, isError]);

    return (
        <div className="product cursor-pointer sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4">
            {isLogin && (
                <i
                    onClick={toggleWishlist}
                    className={`fa-solid fa-heart text-xl cursor-pointer ${isInWishlist ? 'text-red-600' : 'text-gray-400'}`}
                />
            )}
            <Link to={`/productdetails/${id}/${category._id}`} className="inner">
                <img src={imageCover} className="w-full" alt={slug} />
                <p className="text-green-color text-sm font-bold">{category.name}</p>
                <p className="">{title}</p>
                <div className="flex justify-between my-3">
                    <div>
                        <p className={priceAfterDiscount ? 'line-through' : ''}>{price} EGP</p>
                        <p>{priceAfterDiscount ? priceAfterDiscount + 'EGP' : ''}</p>
                    </div>
                    <span>{ratingsAverage} <i className="fa-solid fa-star text-rating-color"></i></span>
                </div>
            </Link>
            <button onClick={() => { mutate(id) }} className="btn bg-green-500 text-white px-5 py-3 rounded">Add to Cart</button>
        </div>
    );
}