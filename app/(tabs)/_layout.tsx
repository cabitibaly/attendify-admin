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
                        headerShown: true,
                        title: "Employés",
                        tabBarStyle: { backgroundColor: 'transparent' },
                        headerStyle: { backgroundColor: 'transparent' },
                        headerTransparent: true,
                        headerTitleStyle: { 
                            color: '#EEEEF0', 
                            fontSize: 28, 
                            fontWeight: "semibold" 
                        },
                        headerTitleAlign: "center",
                    }} 
                />
                <Tabs.Screen 
                    name="conge"                    
                    options={{
                        headerShown: true,
                        title: "congés",
                        tabBarStyle: { backgroundColor: 'transparent' },
                        headerStyle: { backgroundColor: 'transparent' },
                        headerTransparent: true,
                        headerTitleStyle: { 
                            color: '#EEEEF0', 
                            fontSize: 28, 
                            fontWeight: "semibold" 
                        },
                        headerTitleAlign: "center",
                    }} 
                />
                <Tabs.Screen 
                    name="profile"
                    options={{
                        headerShown: false,
                        title: "Profile"
                    }} 
                />
            </Tabs>            
        </ImageBackground>
    )
}

export default TabLayout