import { Platform } from "react-native";

const DEV_API_URL = Platform.select({
    android: __DEV__ ? "http://192.168.11.130:8080" : "https://attendify.powertechbf.com",
    ios: __DEV__ ? "http://192.168.11.118:8080" : "https://attendify.powertechbf.com",
})

export default DEV_API_URL;