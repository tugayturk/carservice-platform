import axios from "axios"

const URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/carts?populate[cart_items][populate]=product`

const GetCarts = async () => {
    const response = await axios.get(URL)
    return response.data

}

export default GetCarts