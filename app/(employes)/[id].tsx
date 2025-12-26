import { EditIcon } from '@/components/svg/editIcon'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import React from 'react'
import { Image, ImageBackground, Pressable, Text, TouchableOpacity, View } from 'react-native'

const DetailEmploye = () => {
    const { id } = useLocalSearchParams();    

    return (
        <ImageBackground
            source={require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 py-4 pt-10 pb-4 flex-1 items-center justify-start gap-8"
        >
            <Stack.Screen options={{headerShown: false}} />
            <View className='w-full flex-row items-center justify-between'>
                <Pressable onPress={() => router.back()} className="size-10 z-50 rounded-full bg-violet-9 items-center justify-center">
                    <ChevronLeft strokeWidth={1.75} size={28} color='#EEEEF0' />
                </Pressable>
                <Text className='text-3xl text-gris-12 font-semibold'>Détails employé</Text>
                <Pressable onPress={() => router.push("/(employes)")} className="size-10 z-50 rounded-full bg-violet-9 items-center justify-center">
                    <EditIcon size={20} color='#EEEEF0' />
                </Pressable>
            </View>
            <View className='w-full items-center justify-center'>
                <Image className='size-28 rounded-full' source={require("../../assets/images/Dear-Santa.jpeg")} />
            </View>
            <View className='relative w-full flex-col items-start justify-center'>
                <Text className='text-xl text-gris-11 font-regular'>Nom</Text>
                <Text className='text-2xl text-gris-12 font-medium line-clamp-1'>Santa</Text>
                <View style={{ width: '100%', height: 1, backgroundColor: '#5F606A', marginTop: 8 }} />
            </View>
            <View className='relative w-full flex-col items-start justify-center'>
                <Text className='text-xl text-gris-11 font-regular'>Prénom</Text>
                <Text className='text-2xl text-gris-12 font-medium line-clamp-1'>Dear</Text>
                <View style={{ width: '100%', height: 1, backgroundColor: '#5F606A', marginTop: 8 }} />
            </View>
            <View className='relative w-full flex-col items-start justify-center'>
                <Text className='text-xl text-gris-11 font-regular'>Email</Text>
                <Text className='text-2xl text-gris-12 font-medium line-clamp-1'>santadear@gachiakuta.jp</Text>
                <View style={{ width: '100%', height: 1, backgroundColor: '#5F606A', marginTop: 8 }} />
            </View>
            <View className='relative w-full flex-col items-start justify-center'>
                <Text className='text-xl text-gris-11 font-regular'>Téléphone</Text>
                <Text className='text-2xl text-gris-12 font-medium line-clamp-1'>+000 00 00 00 00</Text>
                <View style={{ width: '100%', height: 1, backgroundColor: '#5F606A', marginTop: 8 }} />
            </View>
            <View className='relative w-full flex-col items-start justify-center'>
                <Text className='text-xl text-gris-11 font-regular'>Poste</Text>
                <Text className='text-2xl text-gris-12 font-medium line-clamp-1'>Néttoyeur</Text>
                <View style={{ width: '100%', height: 1, backgroundColor: '#5F606A', marginTop: 8 }} />
            </View>
            <TouchableOpacity 
                activeOpacity={0.8} 
                className='absolute bottom-8 px-4 py-5 w-full rounded-full bg-violet-8 items-center justify-center'
            >
                <Text className='text-xl text-gris-12 font-medium'>Réinitialiser son mot de passe</Text>    
            </TouchableOpacity>            
        </ImageBackground>
    )
}

export default DetailEmploye