import { useMutation } from "@tanstack/react-query";
import axios from "axios";

let token = localStorage.getItem('token');
export function addToCart(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId},{
        headers:{
            token
        }
    })
}


export function deleteItem(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        headers:{
            token
        }
    })
}


export function clearCart(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers:{
            token
        }
    })
}


export function updateCount({productId,count}){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count},{
        headers:{
            token
        }
    })
}

export default function useMutationCart(fn) {
    return useMutation({mutationFn: fn})
}
