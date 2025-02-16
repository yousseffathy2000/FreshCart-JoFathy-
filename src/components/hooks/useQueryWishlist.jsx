import { useQuery } from "@tanstack/react-query";
import axios from "axios";



let token = localStorage.getItem('token')
export function getWishList(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers:{
        token
    }})
}

export default function useQueryWishlist(fn) {
    return useQuery({queryKey:['wishList'],queryFn:fn,refetchOnWindowFocus: false,refetchOnMount: false})
}

