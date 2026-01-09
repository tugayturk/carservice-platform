import axios from "axios"

const URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/local`

const loginUser = async (email: string, password: string) => {
    try {   
        const response = await axios.post(URL, { identifier: email, password: password })
        return response.data
    } catch (error) {
        console.error("Login API error:", error)
        throw error
    }
}

export default loginUser