import CongeStatutModal from '@/components/modal/congeSatutModal'
import PDFIcon from '@/components/svg/pdfIcon'
import { router } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import React, { useState } from 'react'
import { Image, ImageBackground, Pressable, Text, TouchableOpacity, View } from 'react-native'

const DetailConge = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [statut, setStatut] = useState<string>("En attente")

    const handleClick = (s: string) => {
        setModalVisible(true)
        setStatut(s)
    }

    return (
        <ImageBackground
            source={require("../../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 pb-4 pt-10 flex-1 w-full h-full gap-8"
        >
            <View className='relative w-full flex-row items-center justify-center'>
                <Pressable onPress={() => router.back()} className="absolute left-0 size-10 z-50 rounded-full bg-violet-9 items-center justify-center">
                    <ChevronLeft strokeWidth={1.75} size={28} color='#EEEEF0' />
                </Pressable>
                <Text className='text-3xl text-gris-12 font-semibold'>Détails du congé</Text>
            </View> 
            <View className='flex-row items-center justify-between w-full'>
                <View className='flex-row items-center justify-center gap-3'>
                    <View className='overflow-hidden size-14 rounded-full'>
                        <Image className='size-14 rounded-full' source={require('../../../assets/images/Dear-Santa.jpeg')} />
                    </View>
                    <View className='flex-col items-start justify-start'>
                        <Text className='text-xl text-gris-12 font-medium line-clamp-1'>Dear Santa</Text>
                        <Text className='text-base text-gris-11 font-regular line-clamp-1'>Nettoyeur</Text>                    
                    </View>                
                </View>
                <View  className='rounded-lg p-2 bg-jaune/40 items-center justify-center'>
                    <Text className='text-jaune text-sm font-semibold'>En attente</Text>
                </View>
            </View>   
            <View className='w-full flex-col gap-2'>
                <Text className='text-xl text-gris-11 font-regular line-clamp-1'>Date</Text>
                <Text className='text-xl text-gris-12 font-medium'>
                    {new Date().toLocaleDateString('fr-FR', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} - {new Date().toLocaleDateString('fr-FR', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                </Text>                    
            </View> 
            <View className='w-full flex-col gap-2'>
                <Text className='text-xl text-gris-11 font-regular line-clamp-1'>Type de congé</Text>
                <Text className='text-xl text-gris-12 font-medium'>Congé exceptionnel</Text>                   
            </View> 
            <View className='w-full flex-col gap-2'>
                <Text className='text-xl text-gris-11 font-regular line-clamp-1'>Raison</Text>
                <Text className='text-xl text-gris-12 font-medium'>MyID is an HR management platform that helps employees manage daily attendance with ease.</Text>                   
            </View>
            <View className='w-full flex-col items-start justify-start gap-2'>
                <Text className='text-xl text-gris-11 font-regular'>Pièce jointe</Text>
                <View className='p-3 rounded-xl bg-violet-5/50 w-full flex-row items-center justify-start gap-2'>
                    <PDFIcon />
                    <View className='flex-col items-start justify-start gap-0'>
                        <Text className='text-base text-gris-12 font-regukar line-clamp-1'>Attestation_de_présence.pdf</Text>
                        <Text className='text-base text-gris-8 font-medium'>1.1 MB</Text>
                    </View>
                </View>
            </View>
            <View className='absolute left-4 bottom-8 w-full flex-row items-center justify-between gap-4'>
                <TouchableOpacity
                    onPress={() => handleClick("Rejeté")}
                    activeOpacity={0.8} 
                    className='px-4 py-5 flex-1 rounded-full bg-rouge items-center justify-center'
                >
                    <Text className='text-xl text-gris-12 font-medium'>Rejeté</Text>    
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleClick("Approuvé")}
                    activeOpacity={0.8} 
                    className='px-4 py-5 flex-1 rounded-full bg-vert items-center justify-center'
                >
                    <Text className='text-xl text-gris-12 font-medium'>Approuvé</Text>    
                </TouchableOpacity>
            </View>
            <CongeStatutModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                statut={statut}
            />
        </ImageBackground>        
    )
}

export default DetailConge