import axios from "axios"

const addToCart = async (data: { productId: number, quantity: number, price: number, user: string }, jwt: string) => {
    try {
        // Önce kullanıcının cart'ını bul
        const cartResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/carts?filters[user][$eq]=${data.user}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
        )

        let cartId: number

        // Cart yoksa oluştur
        if (!cartResponse.data.data || cartResponse.data.data.length === 0) {
            const newCartResponse = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/carts`,
                {
                    data: {
                        user: data.user,
                        amount: 0
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )
            cartId = newCartResponse.data.data.id
        } else {
            cartId = cartResponse.data.data[0].id
        }

        // Cart-item oluştur
        const cartItemResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart-items`,
            {
                data: {
                    product: data.productId,
                    quantity: data.quantity,
                    price: data.price * data.quantity, // Toplam fiyat
                    cart: cartId
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
        )

        // Cart'ın amount'unu güncelle (cart_items toplamı)
        const cartItemsResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart-items?filters[cart][id][$eq]=${cartId}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
        )

        const totalAmount = cartItemsResponse.data.data.reduce((acc: number, item: any) => {
            return acc + (item.price || 0)
        }, 0)

        await axios.put(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/carts/${cartId}`,
            {
                data: {
                    amount: totalAmount
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
        )

        return cartItemResponse.data
    } catch (error) {
        console.error('Error adding to cart:', error)
        throw error
    }
}

export default addToCart