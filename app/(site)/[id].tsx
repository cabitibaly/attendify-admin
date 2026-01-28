import CustomDateTimePicker from '@/components/datepicker/date-time-picker'
import Loading from '@/components/loading/loading'
import SupprimerModal from '@/components/modal/supprimerModal'
import { useFetchListSites, useFetchSite } from '@/hooks/sites/useFetchSite'
import DEV_API_URL from '@/utils/api'
import { authenticatedRequest } from '@/utils/authUtils'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { ChevronLeft, Trash2 } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, Platform, Pressable, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { defaultTimeFormat } from './nouveau-site'

interface RequestResponse {
    message: string
    status: number
}

const ModifierUnSite = () => {
    const { id } = useLocalSearchParams();
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [heureDebut, setHeureDebut] = useState<Date>(new Date());
    const [heureFin, setHeureFin] = useState<Date>(new Date());
    const [site, setSite] = useState<string>('');
    const [rayon, setRayon] = useState<string>('');
    const [isLoadingRequest, setIsLoadingRequest] = useState<boolean>(false);
    const { site: siteFetch, isLoading, refetch } = useFetchSite(Number(id));   
    const { refetch: refetchListSites } = useFetchListSites();

    useEffect(() => {

        if (siteFetch) {            
            setSite(siteFetch.site)
            setRayon(String(siteFetch.rayon))

            const debutHeure = siteFetch.heureDebut.slice(0, 2)
            const debutMinute = siteFetch.heureDebut.slice(3, 5)

            const finHeure = siteFetch.heureFin.slice(0, 2)
            const finMinute = siteFetch.heureFin.slice(3, 5)        

            const formatedHeureDebut = defaultTimeFormat(Number(debutHeure), Number(debutMinute))
            const formatedHeureFin = defaultTimeFormat(Number(finHeure), Number(finMinute))

            setHeureDebut(formatedHeureDebut)
            setHeureFin(formatedHeureFin)            
        }

    }, [siteFetch]);

    const modifierSite = async () => {
        setIsLoadingRequest(true)

        try {

            const data = await authenticatedRequest<RequestResponse>({
                url: `${DEV_API_URL}/site/modifier/${id}`,
                method: 'PATCH',
                data: {
                    nom_site: site,
                    rayon: Number(rayon),
                    heureDebut: heureDebut.toISOString().replace("Z", ""),
                    heureFin: heureFin.toISOString().replace("Z", ""),
                }
            })

            if (data?.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Modification',
                    text2: data.message,
                })

                refetch()
                refetchListSites()
                router.back()
            }
            
        } catch (error) {
            console.error("Erreur lors de la modification du site:", error)
        } finally { setIsLoadingRequest(false) }
    }       

    return (
        <ImageBackground
            source={
                require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 py-4 pt-10 pb-4 flex-1 items-center justify-start gap-8 bg-violet-2"
        >
            <Stack.Screen options={{headerShown: false, contentStyle: {backgroundColor: "#1A132C"}}} />
            <View className='relative w-full flex-row items-center justify-between'>
                <Pressable onPress={() => router.back()} className="size-10 z-50 rounded-full bg-violet-9 items-center justify-center">
                    <ChevronLeft strokeWidth={1.75} size={28} color='#EEEEF0' />
                </Pressable>
                <Text className='text-3xl text-gris-12 font-semibold'>Modifier un site</Text>
                <Pressable onPress={() => setModalVisible(true)} className='size-10 rounded-full bg-red-500 items-center justify-center'>
                    <Trash2 strokeWidth={1.5} size={16} color='#EEEEF0' />
                </Pressable>
            </View>
            {   
                isLoading ?
                        <Loading />
                    :
                        <>    
                            <KeyboardAvoidingView
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
                                style={{ flex: 1, width: '100%' }}
                            >
                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ paddingBottom: 60 }}
                                    keyboardShouldPersistTaps="handled"
                                    refreshControl={
                                        <RefreshControl 
                                            refreshing={isLoading} 
                                            onRefresh={refetch} 
                                        />
                                    }
                                >
                                    <View className='w-full gap-6'>
                                        <View className='w-full flex-col items-start justify-center gap-2'>
                                            <Text className='text-xl text-gris-12 font-medium'>Heure de début</Text>
                                            <CustomDateTimePicker 
                                                onDateChange={setHeureDebut} 
                                                defaultTime={heureDebut}
                                            />
                                        </View>
                                        <View className='w-full flex-col items-start justify-center gap-2'>
                                            <Text className='text-xl text-gris-12 font-medium'>Heure de fin</Text>
                                            <CustomDateTimePicker 
                                                onDateChange={setHeureFin} 
                                                defaultTime={heureFin}
                                            />
                                        </View>
                                        <View className='w-full flex-col items-start justify-center gap-2'>
                                            <Text className='text-xl text-gris-12 font-medium'>Nom du site</Text>
                                            <TextInput
                                                value={site} 
                                                onChangeText={setSite}
                                                className='w-full bg-violet-5 px-4 py-4 rounded-2xl text-xl text-gris-12' 
                                                placeholderTextColor={"#797B86"} 
                                                placeholder='Saisir le nom de votre site'
                                                returnKeyType="next" 
                                            />
                                        </View>
                                        <View className='w-full flex-col items-start justify-center gap-2'>
                                            <Text className='text-xl text-gris-12 font-medium'>Rayon</Text>
                                            <TextInput
                                                value={rayon} 
                                                onChangeText={setRayon}
                                                className='w-full bg-violet-5 px-4 py-4 rounded-2xl text-xl text-gris-12' 
                                                placeholderTextColor={"#797B86"} 
                                                placeholder='Saisir le rayon de delimitation'
                                                returnKeyType="next" 
                                            />
                                        </View>                        
                                    </View>
                                </ScrollView>                
                            </KeyboardAvoidingView>
                            <TouchableOpacity
                                onPress={modifierSite}
                                disabled={isLoadingRequest}
                                activeOpacity={0.8} 
                                className='absolute bottom-8 px-4 py-5 w-full rounded-full bg-violet-8 items-center justify-center'
                            >
                                {
                                    isLoadingRequest ?
                                        <ActivityIndicator size="small" color="#EEEEF0" />
                                        :
                                        <Text className='text-xl text-gris-12 font-medium'>Soumettre</Text>
                                }                  
                            </TouchableOpacity>
                        </>
            }
            <SupprimerModal 
                visible={modalVisible}
                goBack={true}
                onClose={() => {setModalVisible(false)}}
                url={`${DEV_API_URL}/site/supprimer/${id}`}
                title='Supprimer un site'
                paragraph={`Êtes vous sûr de vouloir supprimer le site ${siteFetch?.site} ?`}
            />
        </ImageBackground>
    )
}

export default ModifierUnSite