import { LoginData, ResponseLoginData, Utilisateur } from "@/interfaces/utilisateur"
import DEV_API_URL from "@/utils/api"
import { authenticatedRequest, getToken, getUserInformations, removeTokens, setTokens } from "@/utils/authUtils"
import { useQuery } from "@tanstack/react-query"
import { router } from "expo-router"
import { ReactNode, useState } from "react"
import Toast from "react-native-toast-message"
import AuthContext from "./authContext"

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [utilisateur, setUtilisateur] = useState<Utilisateur | null | undefined>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)           

    const { isLoading, refetch } = useQuery({
        queryKey: ['utilisateur'],
        queryFn:  async () => await getUserInformations(setUtilisateur, setIsAuthenticated),
        staleTime: 60 * 60 * 1000,
    })

    const login = async (loginData: LoginData): Promise<void> => {        
        const data = await authenticatedRequest<ResponseLoginData>({
            url: `${DEV_API_URL}/auth/connexion-admin`,
            method: 'POST',
            data: loginData,
        })

        if (!data) return

        setTokens(data.access_token, data.refresh_token)
        setUtilisateur(data.utilisateur)
        setIsAuthenticated(true)

        Toast.show({
            type: 'success',
            text1: 'Connexion',
            text2: "Connexion réussie",
        })
        
        router.replace("/(tabs)")        
    }

    const logout = async (): Promise<void> => {
        const refresh_token = await getToken("REFRESH")

        const data = await authenticatedRequest<{status: number, message: string}>({
            url: `${DEV_API_URL}/auth/deconnexion`,
            method: 'POST',
            data: { refresh_token }
        })        

        if (!data) return

        setUtilisateur(null)
        setIsAuthenticated(false)
        removeTokens()

        Toast.show({
            type: 'success',
            text1: 'Déconnexion',
            text2: data.message,
        })        
    }

    return (
        <AuthContext.Provider 
            value={{
                utilisateur,
                isLoading,
                isAuthenticated,
                login,
                logout,
                refetch,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider