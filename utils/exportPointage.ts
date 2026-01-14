import { Directory, File, Paths } from 'expo-file-system';
import { router } from 'expo-router';
import * as Sharing from 'expo-sharing';
import Toast from 'react-native-toast-message';
import DEV_API_URL from './api';
import { getToken, refreshAccessToken, removeTokens } from './authUtils';

export const exportToExcel = async (debut: string, fin: string, retryOnce = true) => {

    if (!debut || !fin) {
        Toast.show({
            type: 'error',
            text1: 'Erreur',
            text2: "Veuillez sélectionner une date de début et une date de fin",
        })
        return
    }

    const debutParsed = new Date(debut).toISOString()
    const finParsed = new Date(fin).toISOString()

    try {
        
        const cacheDir = new Directory(Paths.cache, 'temp');    
        cacheDir.create();

        const tempFile = await File.downloadFileAsync(
            `${DEV_API_URL}/pointage/export?debut=${debutParsed}&fin=${finParsed}`, 
            cacheDir, 
            {
                headers: {"Authorization": `Bearer ${await getToken("ACCESS")}`,}
            }
        );
        
        await Sharing.shareAsync(tempFile.uri);

        cacheDir.delete();    

    } catch (error: any) {

        if (!error.message?.includes('status: 401')) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: "une erreur est survenue lors de l'export",
            })
            return
        }

        console.log("Erreur récupération token refresh:", error)
        if (error.message?.includes('status: 401') && retryOnce) {
            console.log("Récupération d'un refresh_token...")
            const newAccessToken = await refreshAccessToken()
            if (newAccessToken) {
                exportToExcel(debut, fin, false)
            }
        }

        Toast.show({
            type: 'error',
            text1: 'Erreur',
            text2: "une erreur est survenue lors de l'export",
        })
        
        await removeTokens()
        router.replace("/(auth)")    
    }
}