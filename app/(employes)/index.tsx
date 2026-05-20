import Dropdown from '@/components/dropdown/dropdown'
import PasswordPreviewModal from '@/components/modal/passwordPreviewModal'
import { useFetchListEmployes } from '@/hooks/employes/useFetchEmployes'
import DEV_API_URL from '@/utils/api'
import { authenticatedRequest } from '@/utils/authUtils'
import { router } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import React, { useState } from 'react'
import {
    ActivityIndicator,
    ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput,
    TouchableOpacity, View
} from 'react-native'
import Toast from 'react-native-toast-message'

interface NewEmployeResponse {
    status: number
    message: string
    motDePasse: string
}

const NouveauEmploye = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [nom, setNom] = useState<string>('')
    const [prenom, setPrenom] = useState<string>('')
    const [telephone, setTelephone] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [poste, setPoste] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [site, setSite] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { refetch } = useFetchListEmployes();

    const creerUnEmploye = async () => {
        if (!site) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: "Veuillez sélectionner un site",
            })
            return
        }

        setIsLoading(true)

        try {
            const data = await authenticatedRequest<NewEmployeResponse>({
                url: `${DEV_API_URL}/auth/nouveau-compte-employe`,
                method: 'POST',
                data: {
                    nom,
                    prenom,
                    telephone,
                    email,
                    poste,
                    siteID: site,
                }
            })

            if (data?.status === 201) {
                Toast.show({
                    type: 'success',
                    text1: 'Création',
                    text2: data.message,
                })
                setPassword(data.motDePasse)
                setNom("")
                setPrenom("")
                setTelephone("")
                setEmail("")
                setPoste("")
                setSite(null)
                refetch()
            }

        } catch (error) {
            console.error("Erreur lors de la création de l'employé:", error)
        } finally { setIsLoading(false) }
    }

    return (
        <ImageBackground
            source={
                require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 py-4 pt-10 pb-4 flex-1 items-center justify-start gap-8 bg-violet-2"
        >
            <View className='relative w-full flex-row items-center justify-center'>
                <Pressable onPress={() => router.back()} className="absolute left-0 size-10 z-50 rounded-full bg-violet-9 items-center justify-center">
                    <ChevronLeft strokeWidth={1.75} size={28} color='#EEEEF0' />
                </Pressable>
                <Text className='text-3xl text-gris-12 font-semibold'>Nouvel employé</Text>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
                style={{ flex: 1, width: '100%' }}
            >
                <View className='mb-6 w-full flex-col items-start justify-center gap-2'>
                    <Text className='text-xl text-gris-12 font-medium'>Site</Text>
                    <Dropdown site={site} setSite={setSite} />
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 60 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className='w-full gap-6'>                        
                        <View className='w-full flex-col items-start justify-center gap-2'>
                            <Text className='text-xl text-gris-12 font-medium'>Nom</Text>
                            <TextInput 
                                value={nom}
                                onChangeText={setNom}
                                className='w-full bg-violet-5/70 px-4 py-4 rounded-2xl text-xl text-gris-12' 
                                placeholderTextColor={"#797B86"} 
                                placeholder='Saisir le nom'
                                returnKeyType="next" 
                            />
                        </View>
                        <View className='w-full flex-col items-start justify-center gap-2'>
                            <Text className='text-xl text-gris-12 font-medium'>Prénom</Text>
                            <TextInput 
                                value={prenom}
                                onChangeText={setPrenom}
                                className='w-full bg-violet-5/70 px-4 py-4 rounded-2xl text-xl text-gris-12' 
                                placeholderTextColor={"#797B86"} 
                                placeholder='Saisir le prénom'
                                returnKeyType="next" 
                            />
                        </View>
                        <View className='w-full flex-col items-start justify-center gap-2'>
                            <Text className='text-xl text-gris-12 font-medium'>Téléphone</Text>
                            <TextInput
                                value={telephone}
                                onChangeText={setTelephone} 
                                className='w-full bg-violet-5/70 px-4 py-4 rounded-2xl text-xl text-gris-12' 
                                placeholderTextColor={"#797B86"} 
                                placeholder='Saisir le téléphone' 
                                keyboardType='phone-pad'
                                returnKeyType="next" 
                            />
                        </View>
                        <View className='w-full flex-col items-start justify-center gap-2'>
                            <Text className='text-xl text-gris-12 font-medium'>Email</Text>
                            <TextInput
                                value={email}
                                onChangeText={setEmail} 
                                className='w-full bg-violet-5/70 px-4 py-4 rounded-2xl text-xl text-gris-12' 
                                placeholderTextColor={"#797B86"} 
                                placeholder='Saisir le mail' 
                                keyboardType='email-address'
                                returnKeyType="next"                        
                            />
                        </View>
                        <View className='w-full flex-col items-start justify-center gap-2'>
                            <Text className='text-xl text-gris-12 font-medium'>Poste</Text>
                            <TextInput 
                                value={poste}
                                onChangeText={setPoste}
                                className='w-full bg-violet-5/70 px-4 py-4 rounded-2xl text-xl text-gris-12' 
                                placeholderTextColor={"#797B86"} 
                                placeholder='Saisir le poste'                                 
                                returnKeyType="done" 
                            />
                        </View>
                    </View>
                </ScrollView>                
            </KeyboardAvoidingView>
            <TouchableOpacity
                onPress={creerUnEmploye}
                disabled={isLoading}
                activeOpacity={0.8} 
                className='absolute bottom-8 px-4 py-5 w-full rounded-full bg-violet-8 items-center justify-center'
            >
                {
                    isLoading ?
                        <ActivityIndicator size="small" color="#EEEEF0" />
                        :
                        <Text className='text-xl text-gris-12 font-medium'>Soumettre</Text>
                }                
            </TouchableOpacity>
            <PasswordPreviewModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                nomEmp={nom}
                prenomEmp={prenom}
                newPassword={password}
            />
        </ImageBackground>
    )
}

export default NouveauEmploye