import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from './Loading';
import ProductItems from "./ProductItems";
import toast from "react-hot-toast";
import useMutationCart, { addToCart } from "./hooks/useMutationCart";
import useMutationWishList, { addToWishlist, deleteWishList } from "./hooks/useMutationWishList";

export default function ProductDetails() {
    let { data, mutate, error, isError, isSuccess } = useMutationCart(addToCart);
    let { mutate: mutateWishList } = useMutationWishList(addToWishlist);
    let { mutate: mutateDeleteWishList } = useMutationWishList(deleteWishList);

    const [isInWishlist, setIsInWishlist] = useState(false);
    const [productObj, setProductObj] = useState({});
    const [RelatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imgSrc, setImgSrc] = useState('');
    const [ind, setIndex] = useState(0);
    let { id, catId } = useParams();

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

    function changeSrc(e) {
        setIndex(e.target.getAttribute('index'));
        setImgSrc(e.target.src);
    }

    async function getProductDetails() {
        setLoading(true);
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
            setProductObj(data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    async function getRelatedProducts() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${catId}`);
            setRelatedProducts(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getRelatedProducts();
    }, []);

    useEffect(() => {
        getProductDetails();
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container">
            <div className="flex gap-10 items-center mt-5">
                <div className="w-1/3">
                    <img src={imgSrc ? imgSrc : productObj?.imageCover} alt={productObj.slug} className="w-full" />
                    <div className="flex gap-2 mt-5">
                        {productObj?.images?.map((img, index) => (
                            <img
                                index={index}
                                onClick={changeSrc}
                                src={img}
                                key={img}
                                className={`w-[20%] cursor-pointer transition-all ${index == ind ? 'border-2 border-green-500 opacity-100 scale-150' : 'opacity-50'}`}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-2/3">
                    <h2 className="text-[2rem] font-bold my-4">{productObj?.title}</h2>
                    <p>{productObj?.description}</p>
                    <div className="flex justify-between">
                        <div>
                            <h3 className="font-semibold text-sm">{productObj?.category?.name}</h3>
                        </div>
                        <div>
                            <span>{productObj?.ratingsAverage} <i className="fa-solid fa-star text-rating-color"></i></span>
                            <p>{productObj?.price} EGP</p>
                        </div>
                    </div>
                    <i
                        onClick={toggleWishlist}
                        className={`fa-solid fa-heart text-xl cursor-pointer ${isInWishlist ? 'text-red-600' : 'text-gray-400'}`}
                    />
                    <button onClick={() => { mutate(productObj?._id) }} className="btn w-full bg-green-500 py-3 text-white my-3">Add to Cart</button>
                </div>
            </div>
            <h2 className="my-10 font-bold text-[2rem] text-green-500">Related Products : </h2>
            <div className="row">
                <div className='flex flex-wrap'>
                    {RelatedProducts.length ? RelatedProducts.map(product => <ProductItems product={product} key={product._id} />) : <Loading />}
                </div>
            </div>
        </div>
    );
}