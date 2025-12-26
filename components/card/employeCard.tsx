import React from 'react';
import { Image, ImageSourcePropType, Pressable, Text, View } from 'react-native';

interface EmployeCardProps {
    id: number;
    nom: string;
    prenom: string;
    image: ImageSourcePropType;
    poste: string;
}

const EmployeCard = ({id, nom, prenom, image, poste}: EmployeCardProps) => {
    return (
        <Pressable  className='w-full flex-row items-start justify-between gap-3'>
            <View className='overflow-hidden size-14 rounded-full'>
                <Image className='size-14 rounded-full' source={image} />
            </View>
            <View className='flex-1 flex-col items-start justify-start'>
                <Text className='text-xl text-gris-12 font-medium'>{nom} {prenom}</Text>
                <Text className='text-base text-gris-11 font-regular'>{poste}</Text>
                <View style={{ width: '100%', height: 1, backgroundColor: '#5F606A', marginTop: 16 }} />
            </View>
        </Pressable>
    )
}

export default EmployeCard