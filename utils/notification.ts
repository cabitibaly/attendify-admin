import * as Notification from 'expo-notifications';

export const checkNotificationPermisison = async () => {
    const { status } = await Notification.getPermissionsAsync();
    return status === 'granted';
};

export const requestNotificationPermission = async () => {
    const { status } = await Notification.requestPermissionsAsync();    
    if (status !== 'granted') {
        const result = await Notification.requestPermissionsAsync();        
        return result.status === 'granted';
    }

    return true;
}