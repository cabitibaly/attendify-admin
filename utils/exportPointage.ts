import * as FileSystem from 'expo-file-system/legacy';
import Toast from 'react-native-toast-message';
import DEV_API_URL from './api';
import { authenticatedRequest } from './authUtils';

export const exportPointage = async (debut: string, fin: string): Promise<string> => {
    const debutParsed = new Date(debut).toISOString()
    const finParsed = new Date(fin).toISOString()

    const data = await authenticatedRequest({
        url: `${DEV_API_URL}/pointage/export?debut=${debutParsed}&fin=${finParsed}`,
        method: 'GET',
        responseType: 'arraybuffer'
    })    

    const base64 = arrayBufferToBase64(data);
    const fileName = `pointages-${debutParsed.split('T')[0]}-${finParsed.split('T')[0]}.xlsx`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    await FileSystem.writeAsStringAsync(fileUri, base64, { encoding: 'base64' });
    
    Toast.show({
        type: 'success',
        text1: 'Export',
        text2: "Pointages exportés",
    })

    return fileUri;
}

const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';
  let i = 0;

  while (i < bytes.length) {
    const a = bytes[i++];
    const b = i < bytes.length ? bytes[i++] : 0;
    const c = i < bytes.length ? bytes[i++] : 0;

    const bitmap = (a << 16) | (b << 8) | c;

    result += chars[(bitmap >> 18) & 63];
    result += chars[(bitmap >> 12) & 63];
    result += (i - 2 < bytes.length ? chars[(bitmap >> 6) & 63] : '=');
    result += (i - 1 < bytes.length ? chars[bitmap & 63] : '=');
  }

  return result;
};
