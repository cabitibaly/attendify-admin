import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { withLayoutContext } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import Approuve from './approuve'
import EnAttente from './enAttente'
import Rejette from './rejette'

const TopTabs = createMaterialTopTabNavigator()

export default withLayoutContext(function DemandesCongesLayout() {
    return (
        <View className="px-4 py-4 pt-10 pb-4 flex-1 items-center justify-start gap-4">
            <View className='bg-transparent w-full flex-row items-center justify-center'>
                <Text className='text-3xl text-gris-12 font-semibold'>Demandes de congés</Text>
            </View>

            <View className="flex-1 w-full bg-transparent">
                <TopTabs.Navigator
                    screenOptions={{
                        swipeEnabled: true,   
                        sceneStyle: { backgroundColor: 'transparent' },  
                        tabBarStyle: { 
                            backgroundColor: 'transparent',
                            elevation: 0,
                            shadowOpacity: 0,
                            borderStyle: 'solid',
                            borderBottomWidth: 1,
                            borderColor: 'rgba(126,69,202,0.3)',
                        },
                        tabBarIndicatorStyle: {
                            backgroundColor: "#BFA1FF",
                            borderRadius: 100,
                            height: 5,
                        },  
                        tabBarLabelStyle: {
                            fontWeight: "700",
                            fontSize: 16,
                        },
                        tabBarInactiveTintColor: "#797B86",
                        tabBarActiveTintColor: "#BFA1FF",                        
                    }}
                >
                    <TopTabs.Screen 
                        name='enAttente'
                        component={EnAttente}
                        options={{
                            title: "En attente",                            
                        }}
                    />
                    <TopTabs.Screen 
                        name='approuve'
                        component={Approuve}
                        options={{
                            title: "Approuvées",                            
                        }}
                    />
                    <TopTabs.Screen 
                        name='rejette'
                        component={Rejette}
                        options={{
                            title: "Rejetées",                            
                        }}
                    />
                </TopTabs.Navigator>
            </View>
        </View>
    )
})