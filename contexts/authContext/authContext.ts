import { LoginData, Utilisateur } from "@/interfaces/utilisateur";
import { createContext } from "react";

interface AuthContextType {
    utilisateur: Utilisateur | null | undefined
    isLoading: boolean
    isAuthenticated: boolean
    login: (loginData: LoginData) => Promise<void>
    logout: () => Promise<void>
    refetch: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default AuthContext