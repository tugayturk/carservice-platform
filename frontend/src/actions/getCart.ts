import axios from "axios"

const URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/carts`

const GetCarts = async () => {
    const response = await axios.get(URL)
    return response.data

}

export default GetCarts