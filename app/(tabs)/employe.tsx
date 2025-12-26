import { router } from 'expo-router'
import { Plus } from 'lucide-react-native'
import React from 'react'
import { ImageBackground, Pressable, Text, View } from 'react-native'

const Employe = () => {
    return (
        <ImageBackground
            source={require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 py-4 pt-10 pb-4 flex-1 items-center justify-start gap-6"
        >
            <View className='relative w-full flex-row items-center justify-center'>
                <Text className='text-3xl text-gris-12 font-semibold'>Employés</Text>
                <Pressable onPress={() => router.push("/")} className="absolute right-0 size-10 z-50 rounded-full bg-violet-9 items-center justify-center">
                    <Plus size={28} color='#EEEEF0' />
                </Pressable>
            </View>
            <Text className='text-base text-gris-11 font-regular'>10 personnes travaillent avec vous</Text>
        </ImageBackground>
    )
}

export default Employe