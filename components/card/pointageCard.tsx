import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, View } from 'react-native'
import UserStandingIcon from '../svg/userStandingIcon'

const PointageCard = () => {
    return (
        <View className='p-2.5 bg-violet-5/40 w-full rounded-xl flex-row items-center justify-between gap-2'>                
            <LinearGradient
                colors={['#5F35A6', '#3A1470']}
                style={{
                    padding: 16,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}                    
            >                    
                <Text className='text-3xl text-white font-semibold'>26</Text>
                <Text className='text-xl text-white font-medium'>Ven.</Text>
            </LinearGradient>
            <View className='flex-1 flex-col items-center justify-center gap-3'>
                <View className='w-full flex-row items-center justify-between'>
                    <View className='border-r border-gris-8 flex-1 flex-col items-center justify-end'>
                        <Text className='text-xl text-white font-medium'>08:00</Text>
                        <Text className='text-base text-white font-regular'>Arrivée</Text>
                    </View>
                    <View className='border-r border-gris-8 flex-1 flex-col items-center justify-center'>
                        <Text className='text-xl text-white font-medium'>16:00</Text>
                        <Text className='text-base text-white font-regular'>Départ</Text>
                    </View>
                    <View className='flex-1 flex-col items-center justify-center'>
                        <Text className='text-xl text-white font-medium'>08:00</Text>
                        <Text className='text-base text-white font-regular'>D. totale</Text>
                    </View>
                </View>
                <View className='flex-row gap-1.5 items-center justify-center'>
                    <UserStandingIcon color='#7541CD' size={18} />
                    <Text className='text-base text-white font-regular'>Santa Dear</Text>
                </View>
            </View>
        </View>
    )
}

export default PointageCard