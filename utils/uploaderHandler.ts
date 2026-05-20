import axios, { AxiosError } from "axios";
import * as DocumentPicker from 'expo-document-picker';
import Toast from "react-native-toast-message";
 
const UPLOAD_PRESET = process.env.EXPO_PUBLIC_UPLOAD_PRESET;
const CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUD_NAME;

const getImageType = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    const mimeTypes: { [key: string]: string } = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'webp': 'image/webp',
        'bmp': 'image/bmp',
        'svg': 'image/svg+xml',
        'heic': 'image/heic',
        'heif': 'image/heif',
    };
    return mimeTypes[extension || ''] || 'image/jpeg';
};

export const uploadHandler = async (file: DocumentPicker.DocumentPickerAsset | null | string): Promise<string> => {
    if (!file) {
        Toast.show({
            type: 'error',
            text1: 'Erreur',
            text2: "Veuillez sélectionner une image",
        })
        return "";
    }

    if (typeof file === "string") return ""

    const formData = new FormData();

    formData.append(
        "file", 
        {
            uri: file.uri,
            type: file.mimeType || getImageType(file.name || ""),
            name: file.name || "image.jpg",
        } as unknown as Blob
    );

    formData.append("folder", "images/");

    if (!CLOUD_NAME || !UPLOAD_PRESET) {
        throw new Error("CLOUD_NAME ou UPLOAD_PRESET est manquant dans .env");
    }

    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("cloud_name", CLOUD_NAME);

    try {        
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            formData,
            {headers: {"Content-Type": "multipart/form-data"}}
        );

        if (res.status === 200) {
            Toast.show({
                type: 'success',
                text1: 'Upload',
                text2: "Image uploadée",
            })
            return res.data.secure_url as string;
        }

        return "";
    } catch (error) {
        const axiosErr = error as AxiosError;
        console.log(axiosErr.message);
        Toast.show({
            type: 'error',
            text1: 'Erreur',
            text2: "Une erreur est survenue lors de l'upload de l'image",
        })
        return "";
    }
};
