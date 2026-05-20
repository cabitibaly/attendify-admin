import { Site } from "./site"

export interface Utilisateur {
    id: number
    image?: string
    nom: string
    prenom: string
    email: string
    poste: string
    telephone: string
    nombreConge: number
    soldeConge: number
    motdepasseAReinitialiser: boolean
    site: Site
}

export interface LoginData {
    username: string
    motDePasse: string
}

export interface ResponseLoginData {
    access_token: string
    refresh_token: string
    status: number
    utilisateur: Utilisateur
}