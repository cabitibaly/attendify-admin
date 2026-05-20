export interface Conge {
    id: number
    dateDepart: string
    dateRetour: string
    raison: string
    typeConge: string
    pieceJointe: string
    pieceJointeURL: string
    statutConge: string
    utilisateur: UtilisateurConge
}

export interface UtilisateurConge {
    nom: string
    prenom: string
    image: string
    poste: string
}