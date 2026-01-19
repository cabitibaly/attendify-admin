import { Directory, File, Paths } from "expo-file-system";
import * as FileSystem from "expo-file-system/legacy";
import * as IntentLauncher from "expo-intent-launcher";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

const MIME_TYPES: { [key: string]: string } = {
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    txt: "text/plain",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    mp4: "video/mp4",
    mp3: "audio/mpeg",
    zip: "application/zip",
};

const getMimeType = (fileName: string): string => {
    const extension = fileName.split(".").pop()?.toLowerCase() || "";
    return MIME_TYPES[extension] || "application/octet-stream";
};

export const downloadAndGetFileSize = async (
    url: string, onLading?: (bool: boolean) => void,
): Promise<{uri: string, size: number} | null> => {
    if (!url) return null;

    onLading?.(true);

    try {
        const filename = url.split("/").pop() || "";

        const cacheDir = new Directory(Paths.cache);
        const file = new File(cacheDir, filename);
        if (file.exists) {
            const contentUri = await FileSystem.getContentUriAsync(file.uri);
            return {uri: contentUri, size: file.size};
        }

        const downloadResult = await File.downloadFileAsync(url, cacheDir);
        const contentUri = await FileSystem.getContentUriAsync(downloadResult.uri);

        return {uri: contentUri, size: downloadResult.size};

    } catch (error) {
        console.log("une erreur est survenue: ", error);
        return null;
    } finally {
        onLading?.(false);
    }
}

export const openFile = async (uri: string): Promise<void> => {    
    if (!uri) return;

    const filename = uri.split("/").pop() || "";
    const cacheDir = new Directory(Paths.cache);
    const file = new File(cacheDir, filename);
    if (!file.exists) return    

    if (Platform.OS === "ios") {
        await Sharing.shareAsync(file.uri);
        return;
    }

    await IntentLauncher.startActivityAsync(
        "android.intent.action.VIEW",
        {
            data: uri,
            type: getMimeType(filename),
            flags: 1,
        }
    )
}