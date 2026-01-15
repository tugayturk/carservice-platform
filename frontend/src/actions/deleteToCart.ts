import axios from "axios"

const DeleteToCart = async (id: string, jwt: string) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart-items/${id}`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    })
    return response.data
}

export default DeleteToCart