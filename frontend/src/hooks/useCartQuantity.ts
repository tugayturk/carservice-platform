import { create } from "zustand"

interface CartQuantityState {
cartQuantity: number
setCartQuantity: (cartQuantity: number) => void
}

const useCartQuantityStore = create<CartQuantityState>((set) => ({
  cartQuantity: 0,
  setCartQuantity: (cartQuantity: number) => set({ cartQuantity }),
}))

export default useCartQuantityStore 