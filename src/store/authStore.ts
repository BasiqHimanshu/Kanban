import { create } from "zustand"

interface AuthState {
  isLoggedIn: boolean
  login: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!localStorage.getItem("authToken"),

  login: (token) => {
    localStorage.setItem("authToken", token)
    set({ isLoggedIn: true })
  },

  logout: () => {
    localStorage.removeItem("authToken")
    set({ isLoggedIn: false })
  }
}))
