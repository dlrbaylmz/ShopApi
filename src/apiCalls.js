import axios from "axios"

 export const getProductDetails = (id) => {
    return axios.get(`https://fakestoreapi.com/products/${id}`)
}
