import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface CongeCardProps {
    id: number;
    statut: string;
}

const CongeCard = ({ id, statut }: CongeCardProps) => {

    const statusColor = () => {
        switch (statut) {
            case 'En attente':
                return '#FFDC10'
            case 'Approuvé':
                return '#00E074'
            case 'Rejeté':
                return '#FF1474'
            default:
                return '#FFDC10'
        }
    }

    const statusBg = (): string => {
        switch (statut) {
            case 'En attente':
                return 'rgba(255, 220, 16, 0.4)'
            case 'Approuvé':
                return 'rgba(0, 224, 116, 0.4)'
            case 'Rejeté':
                return 'rgba(255, 20, 116, 0.4)'
            default:
                return 'rgba(255, 220, 16, 0.4)'
        }
    }

    return (
        <TouchableOpacity onPress={() => router.push(`/(stack)/conge/${id}`)} activeOpacity={0.8} className="p-4 w-full bg-violet-5/50 rounded-xl flex-col items-center justify-center gap-4">
            <View className='flex-row items-center justify-between w-full'>
                <View className='flex-row items-center justify-center gap-3'>
                    <View className='overflow-hidden size-14 rounded-full'>
                        <Image className='size-14 rounded-full' source={require('../../assets/images/Dear-Santa.jpeg')} />
                    </View>
                    <View className='flex-col items-start justify-start'>
                        <Text className='text-xl text-gris-12 font-medium line-clamp-1'>Dear Santa</Text>
                        <Text className='text-base text-gris-11 font-regular line-clamp-1'>Nettoyeur</Text>                    
                    </View>                
                </View>
                <View style={{backgroundColor: statusBg(),}} className='rounded-lg p-2 items-center justify-center'>
                    <Text style={{color: statusColor()}} className='text-sm font-semibold'>{statut}</Text>
                </View>
            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: 'rgba( 68, 28, 127, 80)' }} />
            <View className='w-full flex-col items-start gap-3'>
                <View className='w-full flex-col gap-1'>
                    <Text className='text-base text-gris-11 font-regular line-clamp-1'>Date</Text>
                    <Text className='text-xl text-gris-12 font-medium'>
                        {new Date().toLocaleDateString('fr-FR', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} - {new Date().toLocaleDateString('fr-FR', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                    </Text>                    
                </View>
                <View className='w-full flex-col gap-1'>
                    <Text className='text-base text-gris-11 font-regular line-clamp-1'>Type de congé</Text>
                    <Text className='text-xl text-gris-12 font-medium'>Congé exceptionnel</Text>                   
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CongeCard