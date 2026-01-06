import AuthContext from "@/contexts/authContext/authContext"
import { useContext } from "react"

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider")
    }

    return {
        utilisateur: context.utilisateur,
        isLoading: context.isLoading,
        isAuthenticated: context.isAuthenticated,
        login: context.login,
        logout: context.logout,
    }
}