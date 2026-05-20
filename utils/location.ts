import * as Location from "expo-location";

export const checkLocationPermission = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    return status === "granted";
}

export const requestLocationPermission = async () => {
    const foreground = await Location.requestForegroundPermissionsAsync();    
    return foreground.status === "granted";
}