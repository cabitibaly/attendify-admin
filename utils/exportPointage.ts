import { Directory, File, Paths } from 'expo-file-system';
import * as FileSystem from 'expo-file-system/legacy';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import DEV_API_URL from './api';
import { getToken, refreshAccessToken, removeTokens } from './authUtils';
import { openFile } from './downloadFile';

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
        
        const cacheDir = new Directory(Paths.cache); 

        if (!cacheDir.exists) {
            cacheDir.create();
        }

        const filename = `pointages_${debutParsed.split("T")[0]}_${finParsed.split("T")[0]}.xlsx`;        

        const file = new File(cacheDir, filename);
            
        if (file.exists) { 
            const contentUri = await FileSystem.getContentUriAsync(file.uri);
            await openFile(contentUri);
            return;
        }

        const tempFile = await File.downloadFileAsync(
            `${DEV_API_URL}/pointage/export?debut=${debutParsed}&fin=${finParsed}`, 
            cacheDir, 
            {
                headers: {"Authorization": `Bearer ${await getToken("ACCESS")}`,}
            }
        );
        
        const contentUri = await FileSystem.getContentUriAsync(file.uri);
        await openFile(contentUri);

    } catch (error: any) {

        if (!error.message?.includes('status: 401')) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: "une erreur est survenue lors de l'export",
            })
            console.log("une erreur est survenue:", error)
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