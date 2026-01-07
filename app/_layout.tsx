import toastConfig from "@/configs/toastConfig";
import AuthProvider from "@/contexts/authContext/authProvider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import "../global.css";

const client = new QueryClient()


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    const [fontsLoaded, fontError] = useFonts({
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),        
        "Poppins-BlackItalic": require("../assets/fonts/Poppins-BlackItalic.ttf"),        
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),        
        "Poppins-BoldItalic": require("../assets/fonts/Poppins-BoldItalic.ttf"),        
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),        
        "Poppins-ExtraBoldItalic": require("../assets/fonts/Poppins-ExtraBoldItalic.ttf"),        
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),        
        "Poppins-ExtraLightItalic": require("../assets/fonts/Poppins-ExtraLightItalic.ttf"),        
        "Poppins-Italic": require("../assets/fonts/Poppins-Italic.ttf"),        
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),        
        "Poppins-LightItalic": require("../assets/fonts/Poppins-LightItalic.ttf"),        
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),        
        "Poppins-MediumItalic": require("../assets/fonts/Poppins-MediumItalic.ttf"),        
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),        
        "Poppins-Semibold": require("../assets/fonts/Poppins-SemiBold.ttf"),        
        "Poppins-SemiboldItalic": require("../assets/fonts/Poppins-SemiBoldItalic.ttf"),        
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),        
        "Poppins-ThinItalic": require("../assets/fonts/Poppins-ThinItalic.ttf"),        
    })

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                    <QueryClientProvider client={client}>
                        <AuthProvider>
                            <Stack screenOptions={{headerShown: false}}>
                                <Stack.Screen name="(auth)" />
                                <Stack.Screen name="(tabs)" />
                                <Stack.Screen name="(historique)" />
                                <Stack.Screen name="(stack)" />
                                <Stack.Screen name="(site)" />
                            </Stack>
                        </AuthProvider>
                    </QueryClientProvider>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
            <Toast 
                config={toastConfig}
                visibilityTime={3000}
            />
        </>
    );
}
