import axios from "axios";

let token = localStorage.getItem('token')

export function paymentOnline({cartId, shippingAddress}) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        { shippingAddress }, { headers: { token } }
    );
}