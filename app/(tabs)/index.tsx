import PointageCard from '@/components/card/pointageCard'
import AlarmOffIcon from '@/components/svg/AlarmOffIcon'
import BellIcon from '@/components/svg/bellIcon'
import UserRemoveIcon from '@/components/svg/userRemovedIcon'
import UserVerifiedIcon from '@/components/svg/UserVerifiedIcon'
import { router } from 'expo-router'
import { Percent } from 'lucide-react-native'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

const Accueil = () => {
    return (
        <View className="px-4 py-4 pt-10 pb-4 flex-1 items-center justify-start gap-6">
            <View className='w-full flex-row items-center justify-between'>
                <View className='flex-col items-start justify-start'>
                    <Text className='text-xl text-gris-12 font-regular'>Bonjour,</Text>
                    <Text className='text-2xl text-gris-12 font-bold'>Corvus Arkha</Text>
                </View>
                <View className='relative size-14 rounded-full bg-violet-5 items-center justify-center'>
                    <BellIcon size={28} />
                    <View className='absolute top-0 right-0 size-4 bg-gris-12 rounded-full' />
                </View>
            </View>
            <View className='w-full flex-col items-start justify-center gap-4'>
                <Text className='text-xl text-gris-12 font-medium'>{new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                <View className='w-full flex-row items-center justify-center gap-4'>
                    <View className='bg-violet-5/40 p-4 rounded-xl w-1/2 flex-col gap-4 items-start justify-center'>
                        <View className='w-full flex-row items-center justify-between gap-1.5'>
                            <View className='size-12 bg-violet-8 rounded-full items-center justify-center'>
                                <UserVerifiedIcon size={28} color='#EEEEF0' />
                            </View>
                            <Text className='text-sm text-gris-12 font-medium'>Total de présent aujourd&apos;hui</Text>
                        </View>                                                
                        <Text className='text-4xl text-gris-12 font-semibold'>6</Text>
                    </View>
                    <View className='bg-violet-5/40 p-4 rounded-xl w-1/2 flex-col gap-4 items-start justify-center'>
                        <View className='w-full flex-row items-center justify-between gap-1.5'>
                            <View className='size-12 bg-violet-8 rounded-full items-center justify-center'>
                                <UserRemoveIcon size={28} color='#EEEEF0' />
                            </View>
                            <Text className='text-sm text-gris-12 font-medium'>Total d&apos;absent aujourd&apos;hui</Text>
                        </View>                                                
                        <Text className='text-4xl text-gris-12 font-semibold'>4</Text>
                    </View>
                </View>
                <View className='w-full flex-row items-center justify-center gap-4'>
                    <View className='bg-violet-5/40 p-4 rounded-xl w-1/2 flex-col gap-4 items-start justify-center'>
                        <View className='w-full flex-row items-center justify-between gap-1.5'>
                            <View className='size-12 bg-violet-8 rounded-full items-center justify-center'>
                                <AlarmOffIcon size={28} color='#EEEEF0' />
                            </View>
                            <Text className='text-sm text-gris-12 font-medium'>Total de retards aujourd&apos;hui</Text>
                        </View>                                                
                        <Text className='text-4xl text-gris-12 font-semibold'>3</Text>
                    </View>
                    <View className='bg-violet-5/40 p-4 rounded-xl w-1/2 flex-col gap-4 items-start justify-center'>
                        <View className='w-full flex-row items-center justify-between gap-1.5'>
                            <View className='size-12 bg-violet-8 rounded-full items-center justify-center'>
                                <Percent size={24} color='#EEEEF0' />
                            </View>
                            <Text className='text-sm text-gris-12 font-medium'>Total d&apos;absent aujourd&apos;hui</Text>
                        </View>                                                
                        <Text className='text-4xl text-gris-12 font-semibold'>60%</Text>
                    </View>
                </View>
            </View>
            <View className='w-full flex-1 flex-col items-start justify-center gap-4'>
                <View className='flex-row items-center justify-between w-full'>
                    <Text className='text-xl text-gris-12 font-medium'>Historique de pointage</Text>
                    <TouchableOpacity onPress={() => router.push("/(historique)")} activeOpacity={0.8}>
                        <Text className='text-xl text-violet-8 font-medium'>Voir plus</Text>
                    </TouchableOpacity>
                </View>    
                <ScrollView 
                    className='rounded-xl'                    
                    contentContainerStyle={{gap: 12, width: '100%', paddingBottom: 88, paddingRight: 4}}                    
                >
                    <PointageCard />
                    <PointageCard />
                    <PointageCard />
                    <PointageCard />
                </ScrollView>            
            </View>
        </View>
    )
}

export default Accueil