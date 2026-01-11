import axios from "axios"

const URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/carts`

const addToCart = async (data: any,jwt: string) => {
    const response = await axios.post(URL, {data
    }, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    })
    return response.data
}

export default addToCart