import { Check, X } from 'lucide-react-native'
import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'

interface PasswordPreviewModalProps {
    visible: boolean
    onClose: () => void
    statut: number | null,
    nomEmp: string | undefined,
    prenomEmp: string | undefined,
}

const CongeStatutModal = ({ nomEmp, prenomEmp, visible, onClose, statut }: PasswordPreviewModalProps) => {

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={visible}            
        >
            <View className='px-4 pb-4 bg-gris-2/50 flex-1 items-center justify-end'>
                <View className='bg-gris-12 px-8 py-8 w-full rounded-[48px] flex-col items-center justify-center gap-4'>
                    <View className='w-full flex-col gap-4 items-center justify-center'>
                        <View style={{backgroundColor: statut === 2 ? "rgba(0, 224, 116, 0.4)" : "rgba(255, 20, 116, 0.4)"}} className='size-[60px] rounded-full bg-violet-8/30 items-center justify-center'>
                            {
                                statut === 2 ?
                                    <Check strokeWidth={1.5} color={"#00E074"} size={32} />
                                :
                                    <X strokeWidth={1.5} color={"#FF1474"} size={28} />
                            }
                        </View>
                        <View className='w-full flex-col gap-4 items-center justify-center'>
                            <Text className='text-gris-1 text-xl font-medium'>
                                La demande a été {statut === 2 ? "approuvée" : "rejetée"}
                            </Text>
                            <Text className='text-gris-8 text-base text-center font-regular'>
                                La demande de congé de {nomEmp} {prenomEmp} a été {statut === 2 ? "approuvée avec succès" : "rejetée"}.
                            </Text>
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

export default CongeStatutModal