import { authenticatedRequest } from '@/utils/authUtils'
import { router } from 'expo-router'
import { Trash2, X } from 'lucide-react-native'
import React, { useState } from 'react'
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'

interface PointageModalProps {
    visible: boolean    
    url: string
    title: string
    paragraph: string
    onClose: () => void
    goBack?: boolean
}

interface SuppressionResponse {
    message: string
    status: number
}

const SupprimerModal = ({ title, paragraph, url, visible, onClose, goBack = false }: PointageModalProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const supprimer = async () => {

        setIsLoading(true)

        try {
            const data = await authenticatedRequest<SuppressionResponse>({
                url: `${url}`,
                method: 'DELETE',
            })

            if (data?.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Suppression',
                    text2: data.message,
                })
                if (goBack) {
                    router.back()
                }
            }

            onClose()
        } catch (error) {
            console.log("une erreur est survenue:", error)
            onClose()
        } finally { setIsLoading(false) }
    }

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={visible}            
        >
            <View className='px-4 pb-6 bg-gris-2/50 flex-1 items-center justify-end'>
                <View className='bg-gris-12 px-6 pb-6 pt-20 w-full rounded-[48px] flex-col items-center justify-center gap-7'>
                    <TouchableOpacity onPress={onClose} activeOpacity={0.8} className='absolute top-6 right-6 size-8 rounded-full bg-rouge/30 items-center justify-center'>
                        <X strokeWidth={1.5} size={20} color={"#FF1474"} />
                    </TouchableOpacity>
                    <View className='flex-col gap-4 items-center justify-center'>
                        <View className='size-[60px] rounded-full bg-violet-8/30 items-center justify-center'>
                            <Trash2 color='#7E45DC' size={24} />
                        </View>
                        <View className='flex-col gap-1 items-center justify-center'>
                            <Text className='text-gris-1 text-2xl font-medium'>{title}</Text>
                            <Text className='text-gris-8 text-xl text-center font-medium'>{paragraph}</Text>
                        </View>                        
                    </View> 
                    <View className='w-full flex-col items-center justify-center gap-4'>
                        <TouchableOpacity disabled={isLoading} onPress={supprimer} activeOpacity={0.8} className='py-4 rounded-3xl w-full bg-violet-8 items-center justify-center'>                            
                            {
                                isLoading ?
                                    <ActivityIndicator size="small" color="#EEEEF0" />
                                    :
                                    <Text className='text-xl text-gris-12 font-medium'>Oui</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose} activeOpacity={0.8} className='py-4 rounded-3xl w-full bg-gris-11/70 items-center justify-center'>
                            <Text className='text-gris-12 text-xl font-medium'>Non</Text>
                        </TouchableOpacity>
                    </View>                   
                </View>
            </View>
        </Modal>
    )
}

export default SupprimerModal