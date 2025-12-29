import CustomNavBar from '@/components/tabbar/customTabBar'
import { Tabs } from 'expo-router'
import React from 'react'
import { ImageBackground } from 'react-native'

const TabLayout = () => {
    return (
        <ImageBackground
            source={require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="flex-1  w-full h-full"
        >            
            <Tabs  
                tabBar={(props) => <CustomNavBar {...props} />}
                screenOptions={{                    
                    tabBarStyle: { backgroundColor: 'transparent' },
                    sceneStyle: { backgroundColor: 'transparent' },
                }}
            >
                <Tabs.Screen 
                    name="index" 
                    options={{
                        headerShown: false,
                        title: "Accueil",
                        tabBarShowLabel: false,                    
                    }} 
                />
                <Tabs.Screen 
                    name="employe"                    
                    options={{
                        headerShown: false,
                    }} 
                />
                <Tabs.Screen 
                    name="conge"                    
                    options={{
                        headerShown: false,
                        title: "congés",                        
                    }} 
                />
                <Tabs.Screen 
                    name="profile"
                    options={{
                        headerShown: false,
                        title: "Profile",                        
                    }} 
                />
            </Tabs>            
        </ImageBackground>
    )
}

export default TabLayout