import CustomDateTimePicker from '@/components/datepicker/date-time-picker'
import { useFetchListSites } from '@/hooks/sites/useFetchSite'
import DEV_API_URL from '@/utils/api'
import { authenticatedRequest } from '@/utils/authUtils'
import { router } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import React, { useState } from 'react'
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'

interface NewSiteResponse {
    message: string
    status: number
}

const NouveauSite = () => {    
    const [heureDebut, setHeureDebut] = useState<Date>(new Date());
    const [heureFin, setHeureFin] = useState<Date>(new Date());
    const [site, setSite] = useState<string>('');
    const [rayon, setRayon] = useState<string>('');
    const [latitude, setLatitude] = useState<string>('');
    const [longitude, setLongitude] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { refetch } = useFetchListSites();

    const defaultTimeFormat = (h: number, m: number): Date => {
        const date = new Date();
        date.setHours(h, m, 0, 0);
        return date;
    }

    const creerSite = async () => { 
        if (!site) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: "Veuillez ajouter un nom de site",
            })
            return;
        }

        if (Number(rayon) <= 0) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: "Veuillez ajouter un rayon supérieur à 0",
            })
            return;
        }

        if (!latitude || !longitude) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: "Veuillez ajouter une latitude et une longitude",
            })
            return;
        }

        if (Number(latitude) < -90 || Number(latitude) > 90) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: "Veuillez ajouter une latitude entre -90 et 90",
            })
            return;
        }

        if (Number(longitude) < -180 || Number(longitude) > 180) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: "Veuillez ajouter une longitude entre -180 et 180",
            })
            return;
        }

        setIsLoading(true);

        try {
            const data = await authenticatedRequest<NewSiteResponse>({
                url: `${DEV_API_URL}/site/ajouter`,
                method: 'POST',
                data: {
                    site,
                    rayon: Number(rayon),
                    latitude: Number(latitude),
                    longitude: Number(longitude),
                    heureDebut,
                    heureFin
                }
            })

            if (data?.status === 201) {
                Toast.show({
                    type: 'success',
                    text1: 'Création',
                    text2: data.message,
                })
                refetch()                
            }            
        } catch (error) {
            console.error("Erreur lors de la création du site:", error)
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
                <Text className='text-3xl text-gris-12 font-semibold'>Nouveau site</Text>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
                style={{ flex: 1, width: '100%' }}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 60 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className='w-full gap-6'>
                        <View className='w-full flex-col items-start justify-center gap-2'>
                            <Text className='text-xl text-gris-12 font-medium'>Heure de début</Text>
                            <CustomDateTimePicker 
                                onDateChange={setHeureDebut} 
                                defaultTime={defaultTimeFormat(8, 0)}
                            />
                        </View>
                        <View className='w-full flex-col items-start justify-center gap-2'>
                            <Text className='text-xl text-gris-12 font-medium'>Heure de fin</Text>
                            <CustomDateTimePicker 
                                onDateChange={setHeureFin} 
                                defaultTime={defaultTimeFormat(16, 0)}
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
                        <View className='w-full flex-col items-start justify-center gap-2'>
                            <Text className='text-xl text-gris-12 font-medium'>Latitude</Text>
                            <TextInput 
                                value={latitude}
                                onChangeText={setLatitude}
                                className='w-full bg-violet-5 px-4 py-4 rounded-2xl text-xl text-gris-12' 
                                placeholderTextColor={"#797B86"} 
                                placeholder='Saisir la latitude'
                                returnKeyType="next" 
                            />
                        </View>
                        <View className='w-full flex-col items-start justify-center gap-2'>
                            <Text className='text-xl text-gris-12 font-medium'>Longitude</Text>
                            <TextInput
                                value={longitude}
                                onChangeText={setLongitude}
                                className='w-full bg-violet-5 px-4 py-4 rounded-2xl text-xl text-gris-12' 
                                placeholderTextColor={"#797B86"} 
                                placeholder='Saisir la longitude'
                                returnKeyType="next"                        
                            />
                        </View>
                    </View>
                </ScrollView>                
            </KeyboardAvoidingView>
            <TouchableOpacity
                onPress={creerSite}
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
        </ImageBackground>
    )
}

export default NouveauSite