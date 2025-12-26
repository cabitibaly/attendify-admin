import { router } from 'expo-router';
import React from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Index = () => {

    return (
        <ImageBackground
            source={require("../assets/images/connexion-background.jpg")}
            resizeMode="cover"
            className="p-4 flex-1 items-center justify-center bg-violet-4"
        >
            <View className='w-full flex-col items-center justify-center gap-8'>
                <Text className='text-4xl text-gris-12 font-bold'>Connecte-toi</Text>
                <View className='w-full flex-col items-center justify-center gap-6'>
                    <View className='w-full flex-col items-start justify-center gap-2'>
                        <Text className='text-base text-gris-12 font-medium'>Email ou téléphone</Text>
                        <TextInput className='w-full bg-violet-5/50 px-4 py-4 rounded-2xl text-xl text-gris-12' placeholderTextColor={"#5F606A"} placeholder='Email ou numéro de téléphone' />
                    </View>
                    <View className='w-full flex-col items-start justify-center gap-2'>
                        <Text className='text-base text-gris-12 font-medium'>Mot de passe</Text>
                        <TextInput secureTextEntry className='w-full bg-violet-5/50 px-4 py-4 rounded-2xl text-xl text-gris-12' placeholderTextColor={"#5F606A"} placeholder='Mot de passe' />
                    </View>                    
                </View>
                <TouchableOpacity onPress={() => router.push("/(tabs)")} activeOpacity={0.6} className='bg-violet-8 w-full py-4 px-8 rounded-2xl items-center justify-center'>
                    <Text className='text-gris-12 text-xl font-semibold'>Se connecter</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default Index