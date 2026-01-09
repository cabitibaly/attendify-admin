import { Platform } from "react-native";

const DEV_API_URL = Platform.select({
    android: __DEV__ ? "http://192.168.11.108:8080" : "https://attendify-api.jiyuu.com",
    ios: __DEV__ ? "http://192.168.11.118:8080" : "https://attendify-api.jiyuu.com",
})

export default DEV_API_URL;