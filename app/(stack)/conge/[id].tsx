import { statusBg, statusColor, statusText } from '@/components/card/congeCard'
import Loading from '@/components/loading/loading'
import CongeStatutModal from '@/components/modal/congeSatutModal'
import PDFIcon from '@/components/svg/pdfIcon'
import { useFetchConge } from '@/hooks/conge/useFetchConge'
import DEV_API_URL from '@/utils/api'
import { authenticatedRequest } from '@/utils/authUtils'
import { router } from 'expo-router'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { ChevronLeft } from 'lucide-react-native'
import React, { useState } from 'react'
import { Image, ImageBackground, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'

interface ChangerStatutResponse {
    status: number
    message: string
}

const DetailConge = () => {
    const { id } = useLocalSearchParams();
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [statut, setStatut] = useState<number | null>(null)
    const [isLoadingRequest, setIsLoadingRequest] = useState<boolean>(false)
    const { conge, isLoading, refetch } = useFetchConge(Number(id))

    const handleClick = async (s: number) => {
        setIsLoadingRequest(true)

        try {
            const data = await authenticatedRequest<ChangerStatutResponse>({
                url: `${DEV_API_URL}/conge/modifier-statut/${id}`,
                method: 'PATCH',
                params: {
                    statutID: s
                }
            })

            if (data?.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Statut',
                    text2: data.message,
                })                
                refetch()
            }

        } catch (error) {
            console.error("Erreur lors de la modification du statut du congé:", error)
        } finally { setIsLoadingRequest(false) }

        setModalVisible(true)
        setStatut(s)
    }

    return (
        <ImageBackground
            source={require("../../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 pb-4 pt-10 flex-1 w-full h-full gap-8"
        >
            <View className='relative w-full flex-row items-center justify-center'>
                <Pressable onPress={() => router.back()} className="absolute left-0 size-10 z-50 rounded-full bg-violet-9 items-center justify-center">
                    <ChevronLeft strokeWidth={1.75} size={28} color='#EEEEF0' />
                </Pressable>
                <Text className='text-3xl text-gris-12 font-semibold'>Détails du congé</Text>
            </View>
                {
                    isLoading ?
                        <Loading />
                        :
                        <>
                            <ScrollView 
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{
                                    gap: 32
                                }}
                            >
                                <View className='flex-row items-center justify-between w-full'>
                                    <View className='flex-row items-center justify-center gap-3'>
                                        <View className='overflow-hidden size-14 rounded-full bg-violet-8'>
                                            {
                                                conge?.utilisateur.image ?
                                                    <Image className='size-14 rounded-full' source={{ uri: conge?.utilisateur.image }} /> 
                                                    : 
                                                    <Text className='text-2xl text-gris-12 font-bold'>
                                                        {conge?.utilisateur.nom.charAt(0).toUpperCase()}
                                                    </Text>
                                            }                        
                                        </View>
                                        <View className='flex-col items-start justify-start'>
                                            <Text className='text-xl text-gris-12 font-medium line-clamp-1'>{conge?.utilisateur.nom} {conge?.utilisateur.prenom}</Text>
                                            <Text className='text-base text-gris-11 font-regular line-clamp-1'>{conge?.utilisateur.poste}</Text>                    
                                        </View>                
                                    </View>
                                    <View style={{backgroundColor: statusBg(conge?.statutConge || ""),}} className='rounded-lg p-2 items-center justify-center'>
                                        <Text style={{color: statusColor(conge?.statutConge || "")}} className='text-sm font-semibold'>{statusText(conge?.statutConge || "")}</Text>
                                    </View>
                                </View>   
                                <View className='w-full flex-col gap-2'>
                                    <Text className='text-xl text-gris-11 font-regular line-clamp-1'>Date</Text>
                                    <Text className='text-xl text-gris-12 font-medium'>
                                        {new Date(conge?.dateDepart || "").toLocaleDateString('fr-FR', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} - {new Date(conge?.dateRetour || "").toLocaleDateString('fr-FR', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                                    </Text>                    
                                </View> 
                                <View className='w-full flex-col gap-2'>
                                    <Text className='text-xl text-gris-11 font-regular line-clamp-1'>Type de congé</Text>
                                    <Text className='text-xl text-gris-12 font-medium'>{conge?.typeConge || "-"}</Text>                   
                                </View> 
                                <View className='w-full flex-col gap-2'>
                                    <Text className='text-xl text-gris-11 font-regular line-clamp-1'>Raison</Text>
                                    <Text className='text-xl text-gris-12 font-medium'>{conge?.raison || "-"}</Text>                   
                                </View>
                                <View className='w-full flex-col items-start justify-start gap-2'>
                                    <Text className='text-xl text-gris-11 font-regular'>Pièce jointe</Text>
                                    {
                                        conge?.pieceJointe ?
                                            <View className='p-3 rounded-xl bg-violet-5/50 w-full flex-row items-center justify-start gap-2'>
                                                <PDFIcon />
                                                <View className='flex-col items-start justify-start gap-0'>
                                                    <Text className='text-base text-gris-12 font-regukar line-clamp-1'>{conge?.pieceJointe}</Text>
                                                    <Text className='text-base text-gris-8 font-medium'>1.1 MB</Text>
                                                </View>
                                            </View>
                                            :
                                            <Text className='text-xl text-gris-12 font-medium'>{"-"}</Text>                   
                                    }
                                </View>                            
                            </ScrollView>
                            {    
                                conge?.statutConge === "EN_ATTENTE" &&
                                <View className='absolute left-4 bottom-8 w-full flex-row items-center justify-between gap-4'>
                                    <TouchableOpacity
                                        onPress={() => handleClick(3)}
                                        disabled={isLoadingRequest}
                                        activeOpacity={0.8} 
                                        className='px-4 py-5 flex-1 rounded-full bg-rouge items-center justify-center'
                                    >
                                        <Text className='text-xl text-gris-12 font-medium'>Rejeté</Text>    
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleClick(2)}
                                        disabled={isLoadingRequest}
                                        activeOpacity={0.8} 
                                        className='px-4 py-5 flex-1 rounded-full bg-vert items-center justify-center'
                                    >
                                        <Text className='text-xl text-gris-12 font-medium'>Approuvé</Text>    
                                    </TouchableOpacity>
                                </View>
                            }
                            <CongeStatutModal
                                visible={modalVisible}
                                onClose={() => setModalVisible(false)}
                                statut={statut}
                                nomEmp={conge?.utilisateur.nom}
                                prenomEmp={conge?.utilisateur.prenom}
                            />
                        </>

            }
        </ImageBackground>        
    )
}

export default DetailConge