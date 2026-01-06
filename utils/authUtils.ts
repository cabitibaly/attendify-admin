import { Utilisateur } from "@/interfaces/utilisateur"
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { router } from "expo-router"
import * as SecureStore from "expo-secure-store"
import React from "react"
import Toast from "react-native-toast-message"
import DEV_API_URL from "./api"

const TOKEN_KEY = {
    ACCESS: 'access_token',
    REFRESH: 'refresh_token',
} as const

export const getToken = async (key: keyof typeof TOKEN_KEY): Promise<string | null> => {
    return await SecureStore.getItemAsync(TOKEN_KEY[key])
}

export const setTokens = async (access_Token: string, refresh_token: string): Promise<void> => {
    await Promise.all([
        SecureStore.setItemAsync(TOKEN_KEY.ACCESS, access_Token),
        SecureStore.setItemAsync(TOKEN_KEY.REFRESH, refresh_token),
    ])
}

export const removeTokens = async (): Promise<void> => {
    await Promise.all([
        SecureStore.deleteItemAsync(TOKEN_KEY.ACCESS),
        SecureStore.deleteItemAsync(TOKEN_KEY.REFRESH),
    ])
}

export const refreshAccessToken = async (): Promise<string | null> => {
    const refresh_token = await getToken("REFRESH")

    if (!refresh_token) {
        console.log("Aucun refresh token trouvé")
        router.push("/")
        return null
    }

    try {
        const res = await axios.post(
            `${DEV_API_URL}/auth/refresh-token`,
            {"token": refresh_token, }
        )

        if (res.status === 200 && res.data) {
            await setTokens(res.data.access_token, res.data.refresh_token)
            return res.data.access_token
        }

        return null

    } catch (error) {
        console.log("Erreur récupération token refresh:", error)
        await removeTokens()
        router.push("/")
        return null
    }
}

export const authenticatedRequest = async <T = any>(
    config: AxiosRequestConfig,
    retryOnce = true,
): Promise<T | null> => {
    let accessToken = await getToken("ACCESS")

    if (!accessToken) {
        console.log("Aucun access token trouvé")
        router.push("/")
        return null
    }

    try {
        const res = await axios.request<T>({
            ...config,
            headers: {
                ...config.headers,
                "Authorization": `Bearer ${accessToken}`,
            },
        })

        return res.data
    } catch (error) {
        const axiosError = error as AxiosError

        if (axiosError.response?.status === 401 && retryOnce) {
            console.log("Récupération d'un refresh_token...")
            const newAccessToken = await refreshAccessToken()

            if (newAccessToken) {
                return authenticatedRequest(config, false)
            }
        }

        console.log("Erreur récupération token refresh:", error)

        Toast.show({
            type: 'error',
            text1: 'Erreur',
            text2: axiosError.message,
        })

        await removeTokens()
        router.push("/")
        return null
    }
}

export const getUserInformations = async (setUtilisateur: React.Dispatch<React.SetStateAction<Utilisateur | null | undefined>>): Promise<Utilisateur | null> => {
    return await authenticatedRequest<{utilisateur: Utilisateur, status: number}>({
        url: `${DEV_API_URL}/compte/mes-informations`,
        method: "GET",
    }).then(data => {
        if (data?.status === 200) {
            setUtilisateur(data.utilisateur)
            return data.utilisateur
        }
        return null
    })
}