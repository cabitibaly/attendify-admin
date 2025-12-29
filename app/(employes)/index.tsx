import PasswordPreviewModal from '@/components/modal/passwordPreviewModal'
import { router } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import React, { useState } from 'react'
import {
    ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput,
    TouchableOpacity, View
} from 'react-native'

const NouveauEmploye = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)

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
                <Text className='text-3xl text-gris-12 font-semibold'>Nouvel employé</Text>
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
                            <Text className='text-xl text-gris-12 font-medium'>Nom</Text>
                            <TextInput 
                                className='w-full bg-violet-5/70 px-4 py-4 rounded-2xl text-xl text-gris-12' 
                                placeholderTextColor={"#797B86"} 
                                placeholder='Saisir le nom'
                                returnKeyType="next" 
                            />
                        </View>
                        <View className='w-full flex-col items-start justify-center gap-2'>
                            <Text className='text-xl text-gris-12 font-medium'>Prénom</Text>
                            <TextInput 
                                className='w-full bg-violet-5/70 px-4 py-4 rounded-2xl text-xl text-gris-12' 
                                placeholderTextColor={"#797B86"} 
                                placeholder='Saisir le prénom'
                                returnKeyType="next" 
                            />
                        </View>
                        <View className='w-full flex-col items-start justify-center gap-2'>
                            <Text className='text-xl text-gris-12 font-medium'>Téléphone</Text>
                            <TextInput 
                                className='w-full bg-violet-5/70 px-4 py-4 rounded-2xl text-xl text-gris-12' 
                                placeholderTextColor={"#797B86"} 
                                placeholder='Saisir le téléphone' 
                                keyboardType='phone-pad'
                                returnKeyType="next" 
                            />
                        </View>
                        <View className='w-full flex-col items-start justify-center gap-2'>
                            <Text className='text-xl text-gris-12 font-medium'>Email</Text>
                            <TextInput 
                                className='w-full bg-violet-5/70 px-4 py-4 rounded-2xl text-xl text-gris-12' 
                                placeholderTextColor={"#797B86"} 
                                placeholder='Saisir le mail' 
                                keyboardType='email-address'
                                returnKeyType="next"                        
                            />
                        </View>
                        <View className='w-full flex-col items-start justify-center gap-2'>
                            <Text className='text-xl text-gris-12 font-medium'>Poste</Text>
                            <TextInput 
                                className='w-full bg-violet-5/70 px-4 py-4 rounded-2xl text-xl text-gris-12' 
                                placeholderTextColor={"#797B86"} 
                                placeholder='Saisir le poste'                                 
                                returnKeyType="done" 
                            />
                        </View>
                    </View>
                </ScrollView>                
            </KeyboardAvoidingView>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                activeOpacity={0.8} 
                className='absolute bottom-8 px-4 py-5 w-full rounded-full bg-violet-8 items-center justify-center'
            >
                <Text className='text-xl text-gris-12 font-medium'>Soumettre</Text>    
            </TouchableOpacity>
            <PasswordPreviewModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
        </ImageBackground>
    )
}

export default NouveauEmploye