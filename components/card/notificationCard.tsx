import { Notif } from '@/interfaces/notif'
import DEV_API_URL from '@/utils/api'
import { authenticatedRequest } from '@/utils/authUtils'
import { Bell } from 'lucide-react-native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface NotificationCardProps {
    notification: Notif,
    refetch: () => void
}

interface RequestResponse {
    message: string,
    status: number,
}

const NotificationCard = ({notification, refetch}: NotificationCardProps) => {    

    const marquerLu = async () => {
        const data = await authenticatedRequest<RequestResponse>({
            url: `${DEV_API_URL}/notification/modifier/${notification.id}?estLu=true`,
            method: 'PATCH',
        })

        if (data?.status === 200) {
            refetch()
        }
    }

    const supprimer = async () => {
        const data = await authenticatedRequest<RequestResponse>({
            url: `${DEV_API_URL}/notification/supprimer/${notification.id}`,
            method: 'DELETE',
        })

        if (data?.status === 200) {
            refetch()
        }        
    }

    return (
        <View className='p-4 bg-violet-5/70 rounded-lg w-full flex-row items-start justify-between gap-4'>
            <View className='size-12 bg-violet-6 rounded-full items-center justify-center'>
                <Bell size={24} color='#EEEEF0' />
            </View>
            <View className='flex-1 flex-col items-start justify-start gap-2'>
                <View className='flex-col items-start justify-start'>
                    <Text className='text-sm text-gris-11 font-medium'>{new Date(notification.dateCreation).toLocaleDateString('fr-FR')}</Text>
                    <Text className='text-xl text-gris-12 font-medium'>{notification.titre}</Text>                
                    <Text className='text-base text-gris-12 font-normal'>{notification.message}</Text>
                </View>                
                <View className='flex-row items-center justify-between gap-2'>
                    <TouchableOpacity onPress={supprimer} activeOpacity={0.8} className='py-2 px-4 bg-rouge rounded-md items-center justify-center rounded-'>
                        <Text className='text-sm text-gris-12 font-medium'>Supprimer</Text>
                    </TouchableOpacity>
                    {
                        !notification.estLu &&
                        <TouchableOpacity onPress={marquerLu} activeOpacity={0.8} className='py-2 px-4 bg-violet-9 rounded-md items-center justify-center rounded-'>
                            <Text className='text-sm text-gris-12 font-medium'>Marquer comme lu</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>            
        </View>
    )
}

export default NotificationCard