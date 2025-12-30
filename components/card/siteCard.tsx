import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MapPinIcon2 from '../svg/mapPinIcon2';

interface SiteCardProps {
    id: number;
    nom: string;
    position: string;
}

const SiteCard = ({id, nom, position}: SiteCardProps) => {
    return (
        <TouchableOpacity activeOpacity={0.9} className='bg-violet-5/30 p-2.5 rounded-xl w-full flex-row items-start justify-start gap-2'>
            <MapPinIcon2 size={24} color='#EEEEF0' />
            <View className='flex-1 flex-col items-start justify-start gap-1'>                
                <Text className='text-xl text-gris-12 font-medium'>{nom}</Text>
                <Text className='text-base text-gris-11 font-medium'>{position}</Text>                
            </View>            
        </TouchableOpacity>
    )
}

export default SiteCard