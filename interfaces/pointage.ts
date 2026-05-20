export interface Pointage {
    id: number
    arrive: Date | null
    depart: Date | null
    heuresTravaillees: number | null,
    estPresent: boolean,
    enRetard: boolean,
    departAnticipe: boolean,
    utilisateur: {
        nom: string
        prenom: string
        image: string
    }
}