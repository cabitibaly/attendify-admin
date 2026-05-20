import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATION_PERMISSION_kEY = 'noficiation_permission_show'
const LOCATION_PERMISSION_kEY = 'location_permission_show'

const STORAGE_KEYS = {
    NOTIFICATION_PERMISSION_kEY: 'noficiation_permission_show',
    LOCATION_PERMISSION_kEY: 'location_permission_show',
} as const

export const makePermissionAsked = async (key: keyof typeof STORAGE_KEYS) => {
    await AsyncStorage.setItem(key, 'true');
}

export const hasPermissionBeenAsked = async (key: keyof typeof STORAGE_KEYS) => {
    const value = await AsyncStorage.getItem(key);
    return value === 'true';
}