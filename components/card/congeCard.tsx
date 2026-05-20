import { Conge } from '@/interfaces/conge';
import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface CongeCardProps {
    conge: Conge
}

export const statusColor = (statut: string): string => {
    switch (statut) {
        case 'EN_ATTENTE':
            return '#FFDC10'
        case 'APPROUVEE':
            return '#00E074'
        case 'REJETEE':
            return '#FF1474'
        default:
            return '#FFDC10'
    }
}

export const statusBg = (statut: string): string => {
    switch (statut) {
        case 'EN_ATTENTE':
            return 'rgba(255, 220, 16, 0.4)'
        case 'APPROUVEE':
            return 'rgba(0, 224, 116, 0.4)'
        case 'REJETEE':
            return 'rgba(255, 20, 116, 0.4)'
        default:
            return 'rgba(255, 220, 16, 0.4)'
    }
}

export const statusText = (statut: string): string => {
    switch (statut) {
        case 'EN_ATTENTE':
            return 'En attente'
        case 'APPROUVEE':
            return 'Approuvé'
        case 'REJETEE':
            return 'Rejeté'
        default:
            return 'En attente'
    }
}

const CongeCard = ({ conge }: CongeCardProps) => {

    return (
        <TouchableOpacity onPress={() => router.push(`/(stack)/conge/${conge.id}`)} activeOpacity={0.8} className="p-4 w-full bg-violet-5/50 rounded-xl flex-col items-center justify-center gap-4">
            <View className='flex-row items-center justify-between w-full'>
                <View className='flex-row items-center justify-center gap-3'>
                    <View className='overflow-hidden size-14 rounded-full bg-violet-8'>
                        {
                            conge.utilisateur.image ?
                                <Image className='size-14 rounded-full' source={{ uri: conge.utilisateur.image }} /> 
                                : 
                                <Text className='text-2xl text-gris-12 font-bold'>
                                    {conge.utilisateur.nom.charAt(0).toUpperCase()}
                                </Text>
                        }                    
                    </View>
                    <View className='flex-col items-start justify-start'>
                        <Text className='text-xl text-gris-12 font-medium line-clamp-1'>{conge.utilisateur.nom} {conge.utilisateur.prenom}</Text>
                        <Text className='text-base text-gris-11 font-regular line-clamp-1'>{conge.utilisateur.poste}</Text>                    
                    </View>                
                </View>
                <View style={{backgroundColor: statusBg(conge.statutConge),}} className='rounded-lg p-2 items-center justify-center'>
                    <Text style={{color: statusColor(conge.statutConge)}} className='text-sm font-semibold'>{statusText(conge.statutConge)}</Text>
                </View>
            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: 'rgba( 68, 28, 127, 80)' }} />
            <View className='w-full flex-col items-start gap-3'>
                <View className='w-full flex-col gap-1'>
                    <Text className='text-base text-gris-11 font-regular line-clamp-1'>Date</Text>
                    <Text className='text-xl text-gris-12 font-medium'>
                        {new Date(conge.dateDepart).toLocaleDateString('fr-FR', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} - {new Date(conge.dateRetour).toLocaleDateString('fr-FR', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                    </Text>                    
                </View>
                <View className='w-full flex-col gap-1'>
                    <Text className='text-base text-gris-11 font-regular line-clamp-1'>Type de congé</Text>
                    <Text className='text-xl text-gris-12 font-medium'>{conge.typeConge}</Text>                   
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CongeCard