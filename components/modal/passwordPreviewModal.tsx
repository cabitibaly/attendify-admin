import * as Clipboard from 'expo-clipboard'
import { X } from 'lucide-react-native'
import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import RefreshIcon from '../svg/refreshIcon'

interface PasswordPreviewModalProps {
    visible: boolean
    onClose: () => void
}

const PasswordPreviewModal = ({ visible, onClose }: PasswordPreviewModalProps) => {

    const copier = async () => {
        await Clipboard.setStringAsync("ofiepassdmyvhcc")
    }

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={visible}            
        >
            <View className='px-4 pb-4 bg-gris-2/50 flex-1 items-center justify-end'>
                <View className='bg-gris-12 px-6 pb-6 pt-20 w-full rounded-[48px] flex-col items-center justify-center gap-7'>
                    <TouchableOpacity onPress={onClose} activeOpacity={0.8} className='absolute top-6 right-6 size-8 rounded-full bg-rouge/30 items-center justify-center'>
                        <X strokeWidth={1.5} size={20} color={"#FF1474"} />
                    </TouchableOpacity>
                    <View className='w-full flex-col gap-4 items-center justify-center'>
                        <View className='size-[60px] rounded-full bg-violet-8/30 items-center justify-center'>
                            <RefreshIcon />
                        </View>
                        <View className='w-full flex-col gap-6 items-center justify-center'>
                            <Text className='text-gris-1 text-xl font-medium'>Mot de passe réinitialisé</Text>
                            <Text className='text-gris-8 text-base text-center font-regular'>
                                Le mot de passe de Santa Dear a été réinitialisé avec succès.
                                Son nouveau mot de passe est :
                            </Text>
                            <TouchableOpacity onPress={copier} activeOpacity={0.8} className='py-4 rounded-xl w-full bg-gris-11/30 items-center justify-center'>
                                <Text className='text-gris-1 text-base font-semibold'>ofiepassdmyvhcc</Text>
                            </TouchableOpacity>
                        </View>                        
                    </View> 
                    <View className='w-full flex-col items-center justify-center gap-4'>                        
                        <TouchableOpacity onPress={onClose} activeOpacity={0.8} className='py-4 rounded-full w-full bg-violet-8 items-center justify-center'>
                            <Text className='text-gris-12 text-xl font-medium'>Fermer</Text>
                        </TouchableOpacity>
                    </View>                   
                </View>
            </View>
        </Modal>
    )
}

export default PasswordPreviewModal