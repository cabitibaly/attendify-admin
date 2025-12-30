import { router } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import React from 'react'
import { ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'

const NouveauSite = () => {
    return (
        <ImageBackground
            source={
                require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 py-4 pt-10 pb-4 flex-1 items-center justify-start gap-8 bg-violet-2"
        >
            <View className='relative w-full flex-row items-center justify-center'>
                <Pressable onPress={() => router.back()} className="absolute left-0 size-10 z-50 rounded-full bg-violet-9 items-center justify-center">
                    <ChevronLeft strokeWidth={1.75} size={28} color='#EEEEF0' />
                </Pressable>
                <Text className='text-3xl text-gris-12 font-semibold'>Nouveau site</Text>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
                style={{ flex: 1, width: '100%' }}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 60 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className='w-full gap-6'>
                        <View className='w-full flex-col items-start justify-center gap-2'>
                            <Text className='text-xl text-gris-12 font-medium'>Nom du site</Text>
                            <TextInput 
                                className='w-full bg-violet-5/70 px-4 py-4 rounded-2xl text-xl text-gris-12' 
                                placeholderTextColor={"#797B86"} 
                                placeholder='Saisir le nom de votre site'
                                returnKeyType="next" 
                            />
                        </View>
                        <View className='w-full flex-col items-start justify-center gap-2'>
                            <Text className='text-xl text-gris-12 font-medium'>Rayon</Text>
                            <TextInput 
                                className='w-full bg-violet-5/70 px-4 py-4 rounded-2xl text-xl text-gris-12' 
                                placeholderTextColor={"#797B86"} 
                                placeholder='Saisir le rayon de delimitation'
                                returnKeyType="next" 
                            />
                        </View>
                        <View className='w-full flex-col items-start justify-center gap-2'>
                            <Text className='text-xl text-gris-12 font-medium'>Latitude</Text>
                            <TextInput 
                                className='w-full bg-violet-5/70 px-4 py-4 rounded-2xl text-xl text-gris-12' 
                                placeholderTextColor={"#797B86"} 
                                placeholder='Saisir la latitude'
                                returnKeyType="next" 
                            />
                        </View>
                        <View className='w-full flex-col items-start justify-center gap-2'>
                            <Text className='text-xl text-gris-12 font-medium'>Longitude</Text>
                            <TextInput 
                                className='w-full bg-violet-5/70 px-4 py-4 rounded-2xl text-xl text-gris-12' 
                                placeholderTextColor={"#797B86"} 
                                placeholder='Saisir la longitude'
                                returnKeyType="next"                        
                            />
                        </View>
                    </View>
                </ScrollView>                
            </KeyboardAvoidingView>
            <TouchableOpacity
                activeOpacity={0.8} 
                className='absolute bottom-8 px-4 py-5 w-full rounded-full bg-violet-8 items-center justify-center'
            >
                <Text className='text-xl text-gris-12 font-medium'>Soumettre</Text>    
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default NouveauSite