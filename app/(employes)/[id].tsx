import Loading from '@/components/loading/loading'
import PasswordPreviewModal from '@/components/modal/passwordPreviewModal'
import SupprimerModal from '@/components/modal/supprimerModal'
import { useFetchEmploye, useFetchListEmployes } from '@/hooks/employes/useFetchEmployes'
import DEV_API_URL from '@/utils/api'
import { authenticatedRequest } from '@/utils/authUtils'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { ChevronLeft, Trash2 } from 'lucide-react-native'
import React, { useState } from 'react'
import { ActivityIndicator, Image, ImageBackground, Pressable, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'

interface ResetPasswordResponse {
    motDePasse: string,
	status:     number,
}

const DetailEmploye = () => {
    const { id } = useLocalSearchParams();
    const [modalVisible, setModalVisible] = useState<boolean>(false) 
    const [modalVisible2, setModalVisible2] = useState<boolean>(false)
    const [isLoadingRequest, setIsloadingRequest] = useState<boolean>(false)
    const [newPassword, setNewPassword] = useState<string>('')
    const { employe, isLoading } = useFetchEmploye(Number(id)) 
    const { refetch } = useFetchListEmployes();
    
    const resetPassword = async () => {
        setIsloadingRequest(true)

        try {
            const data = await authenticatedRequest<ResetPasswordResponse>({
                url: `${DEV_API_URL}/auth/reinitialiser-mot-de-passe/${id}`,
                method: 'PATCH',
            })

            if (data?.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Réinitialisation',
                    text2: 'Votre mot de passe a été réinitialisé avec succès.',
                })
                setNewPassword(data.motDePasse)
                setTimeout(() => setModalVisible(true), 200)
            }
        } catch (error) {
            console.log("une erreur est survenue:", error)
        } finally {setIsloadingRequest(false)}
    }

    return (
        <ImageBackground
            source={require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 py-4 pt-10 pb-4 flex-1 items-center justify-start gap-8 bg-violet-2"
        >
            <Stack.Screen options={{headerShown: false, contentStyle: {backgroundColor: "#1A132C"}}} />
            <View className='relative w-full flex-row items-center justify-between'>
                <Pressable onPress={() => router.back()} className="size-10 z-50 rounded-full bg-violet-9 items-center justify-center">
                    <ChevronLeft strokeWidth={1.75} size={28} color='#EEEEF0' />
                </Pressable>
                <Text className='text-3xl text-gris-12 font-semibold'>Détails employé</Text>
                <Pressable onPress={() => setModalVisible2(true)} className='size-10 rounded-full bg-red-500 items-center justify-center'>
                    <Trash2 strokeWidth={1.5} size={16} color='#EEEEF0' />
                </Pressable>
            </View>
            {        
                isLoading ?
                    <Loading />
                    :
                    <>
                        <View className='bg-violet-8 size-28 rounded-full items-center justify-center'>
                            {
                                employe?.image ?
                                    <Image className='size-full rounded-full' source={{ uri: employe?.image }} /> 
                                    : 
                                    <Text className='text-2xl text-gris-12 font-bold'>
                                        {employe?.nom.charAt(0).toUpperCase()}
                                    </Text>    
                            }                
                        </View>
                        <View className='relative w-full flex-col items-start justify-center'>
                            <Text className='text-xl text-gris-11 font-regular'>Nom</Text>
                            <Text className='text-2xl text-gris-12 font-medium line-clamp-1'>{employe?.nom}</Text>
                            <View style={{ width: '100%', height: 1, backgroundColor: '#5F606A', marginTop: 8 }} />
                        </View>
                        <View className='relative w-full flex-col items-start justify-center'>
                            <Text className='text-xl text-gris-11 font-regular'>Prénom</Text>
                            <Text className='text-2xl text-gris-12 font-medium line-clamp-1'>{employe?.prenom || "-"}</Text>
                            <View style={{ width: '100%', height: 1, backgroundColor: '#5F606A', marginTop: 8 }} />
                        </View>
                        <View className='relative w-full flex-col items-start justify-center'>
                            <Text className='text-xl text-gris-11 font-regular'>Email</Text>
                            <Text className='text-2xl text-gris-12 font-medium line-clamp-1'>{employe?.email}</Text>
                            <View style={{ width: '100%', height: 1, backgroundColor: '#5F606A', marginTop: 8 }} />
                        </View>
                        <View className='relative w-full flex-col items-start justify-center'>
                            <Text className='text-xl text-gris-11 font-regular'>Téléphone</Text>
                            <Text className='text-2xl text-gris-12 font-medium line-clamp-1'>{employe?.telephone}</Text>
                            <View style={{ width: '100%', height: 1, backgroundColor: '#5F606A', marginTop: 8 }} />
                        </View>
                        <View className='relative w-full flex-col items-start justify-center'>
                            <Text className='text-xl text-gris-11 font-regular'>Poste</Text>
                            <Text className='text-2xl text-gris-12 font-medium line-clamp-1'>{employe?.poste}</Text>
                            <View style={{ width: '100%', height: 1, backgroundColor: '#5F606A', marginTop: 8 }} />
                        </View>
                        <TouchableOpacity
                            onPress={resetPassword} 
                            disabled={isLoadingRequest}
                            activeOpacity={0.8} 
                            className='absolute bottom-8 px-4 py-5 w-full rounded-full bg-violet-8 items-center justify-center'
                        >
                            {
                                isLoadingRequest ?
                                    <ActivityIndicator size="small" color="#EEEEF0" />
                                    :
                                    <Text className='text-xl text-gris-12 font-medium'>Réinitialiser son mot de passe</Text>                                
                            }                            
                        </TouchableOpacity>  
                        <PasswordPreviewModal
                            visible={modalVisible}
                            onClose={() => setModalVisible(false)}
                            newPassword={newPassword}
                            nomEmp={employe?.nom}
                            prenomEmp={employe?.prenom}
                        /> 
                        {/* <SupprimerEmploye
                            empId={employe?.id}
                            visible={modalVisible2}
                            onClose={() => setModalVisible2(false)}
                        /> */}
                        <SupprimerModal 
                            visible={modalVisible2}
                            onClose={() => {setModalVisible2(false); refetch()}}
                            url={`${DEV_API_URL}/compte/supprimer-un-compte/${employe?.id}`}
                            title='Supprimer un employé'
                            paragraph={`Êtes vous sûr de vouloir supprimer l'employé ${employe?.nom} ${employe?.prenom} ?`}
                            goBack={true}
                        />  
                    </>                       
            }
        </ImageBackground>
    )
}

export default DetailEmploye