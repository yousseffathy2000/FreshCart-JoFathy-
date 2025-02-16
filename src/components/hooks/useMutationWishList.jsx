import { useMutation } from "@tanstack/react-query"
import axios from "axios"

let token = localStorage.getItem('token')
export function addToWishlist(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},{
        headers:{
            token
        }
    })
}

export function deleteWishList(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
        headers:{
            token
        }
    })
}

export default function useMutationWishList(fn) {
    return useMutation({mutationFn: fn})
}
