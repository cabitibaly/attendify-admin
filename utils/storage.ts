import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATION_PERMISSION_kEY = 'noficiation_permission_show'

export const makePermissionAsked = async () => {
    await AsyncStorage.setItem(NOTIFICATION_PERMISSION_kEY, 'true');
}

export const hasPermissionBeenAsked = async () => {
    const value = await AsyncStorage.getItem(NOTIFICATION_PERMISSION_kEY);
    return value === 'true';
}