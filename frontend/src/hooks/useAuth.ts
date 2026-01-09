import { create } from "zustand"

interface AuthState {
  jwt: string
  loader: boolean
  setJwt: (jwt: string) => void
  setLoader: (loader: boolean) => void
}

const useAuthStore = create<AuthState>((set) => ({
  jwt: "",
  loader: false,
  setJwt: (jwt: string) => set({ jwt }),
  setLoader: (loader: boolean) => set({ loader }),
}))

export default useAuthStore