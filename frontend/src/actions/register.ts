import axios from "axios"

const URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/local/register`

const registerUser = async (username: string, email: string, password: string) => {
    try {  
        const response = await axios.post(URL, { username, email, password })
        return response.data
    } catch (error) {
        console.error("Register API error:", error)
        throw error
    }
}

export default registerUser