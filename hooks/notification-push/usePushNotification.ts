import DEV_API_URL from "@/utils/api";
import { authenticatedRequest } from "@/utils/authUtils";
import { checkNotificationPermisison } from "@/utils/notification";
import { hasPermissionBeenAsked } from "@/utils/storage";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowList: true,
    }),
})

export const usePushNotification = () => {
    const [expoPushToken, setExpoPushToken] = useState<string>('');

    const enregistrerPushToken = async (token: string): Promise<void> => {
        await authenticatedRequest<{status: number, message: string}>({
            url: `${DEV_API_URL}/notification-push`,
            method: 'POST',
            data: { 
                "push_token": token,
                "platform": Platform.OS,
                "device_type": Device.DeviceType,                
                "device_name": Device.deviceName,            
            }
        })        
    }

    const supprimerPushToken = async (token: string): Promise<void> => {
        await authenticatedRequest<{status: number, message: string}>({
            url: `${DEV_API_URL}/notification-push/${token}`,
            method: 'DELETE',
        })
    }

    useEffect(() => {
        const registerForPushNotificationsAsync = async () => {
            let token;

            if (Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                })
            }

            if (!Device.isDevice) return null;

            try {
                const asked = await hasPermissionBeenAsked();
                const granted = await checkNotificationPermisison();

                if (!asked && !granted) return null;

                const tokenData = await Notifications.getExpoPushTokenAsync(
                    Constants.expoConfig?.extra?.eas?.projectId ? { projectId: Constants.expoConfig.extra.eas.projectId } : {}
                );

                const token = tokenData.data;
                setExpoPushToken(token);

                return token;
            } catch (error) {
                console.error("Erreur récupération token push:", error);
                return null;
            }
        }

        registerForPushNotificationsAsync();

    }, [])

    return {
        expoPushToken,
        enregistrerPushToken,
        supprimerPushToken,
    }
}