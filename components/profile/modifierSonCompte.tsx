import { useAuth } from '@/hooks/auth/useAuth';
import DEV_API_URL from '@/utils/api';
import { authenticatedRequest, getToken } from '@/utils/authUtils';
import { BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import EmailIcon from '../svg/emailIcon';
import PhoneIcon from '../svg/phoneIcon';

interface RequestResponse {
    message: string,
    status: number, 
}

const ModifierSonCompte = ({onClose}: {onClose: () => void}) => {
    const [nom, setNom] = useState<string>("");
    const [prenom, setPrenom] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [telephone, setTelephone] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { utilisateur, refetech } = useAuth();
     
    const nomRef = useRef<TextInput>(null);
    const prenomRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const telephoneRef = useRef<TextInput>(null);

    useEffect(() => {

        if (utilisateur) {
            setNom(utilisateur.nom)
            setPrenom(utilisateur.prenom)
            setEmail(utilisateur.email)
            setTelephone(utilisateur.telephone)
        }

    }, [utilisateur])

    const modifierSonCompte = async () => {
        setIsLoading(true)
        const refresh_token = await getToken('REFRESH')

        try {
            const data = await authenticatedRequest<RequestResponse>({
                url: `${DEV_API_URL}/compte/modifier-un-compte`,
                method: 'PATCH',
                data: {
                    nom,
                    prenom,
                    email,
                    telephone,
                    refresh_token
                }
            })

            if (data?.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Modification',
                    text2: data.message,
                })
                
                refetech()
                setTimeout(() => {
                    onClose()
                }, 200);                
            }
        } catch (error) {
            console.log("une erreur est survenue:", error)
        } finally { setIsLoading(false) }
    }

    return (
        <BottomSheetScrollView 
            className="px-4 py-2" 
            keyboardShouldPersistTaps="handled" 
            contentContainerStyle={{ paddingBottom: 8 }}
            showsVerticalScrollIndicator={false}                            
        >
            <View className="w-full flex-col items-center justify-start gap-6">
                    <Text className="text-gris-1 text-2xl font-medium">Modifier son compte</Text>
                    <View className="w-full flex-col items-center justify-start gap-6">
                        <View className='w-full flex-col items-start justify-start gap-2'>
                            <Text className='text-xl text-gris-11 font-medium'>Nom</Text>
                            <BottomSheetTextInput 
                                ref={nomRef}
                                value={nom} 
                                onChangeText={setNom} 
                                className='w-full bg-gris-11/30 px-4 py-4 rounded-2xl text-xl text-gris-1' 
                                placeholderTextColor={"#5F606A"} 
                                placeholder='Saisir son nom' 
                                returnKeyType="next"
                                onSubmitEditing={() => prenomRef.current?.focus()}
                            />
                        </View>
                        <View className='w-full flex-col items-start justify-start gap-2'>
                            <Text className='text-xl text-gris-11 font-medium'>Prénom</Text>
                            <BottomSheetTextInput 
                                ref={prenomRef}
                                value={prenom} 
                                onChangeText={setPrenom} 
                                className='w-full bg-gris-11/30 px-4 py-4 rounded-2xl text-xl text-gris-1' 
                                placeholderTextColor={"#5F606A"} 
                                placeholder='Saisir son prénom' 
                                returnKeyType="next"
                                onSubmitEditing={() => emailRef.current?.focus()}
                            />
                        </View>
                        <View className='w-full flex-col items-start justify-start gap-2'>
                            <Text className='text-xl text-gris-11 font-medium'>Email</Text>
                            <View className="bg-gris-11/30 rounded-2xl px-4 w-full flex-row items-center justify-between gap-2">
                                <BottomSheetTextInput
                                    ref={emailRef}
                                    value={email}
                                    onChangeText={setEmail} 
                                    className='flex-1 bg-transparent py-4 rounded-2xl text-xl text-gris-1' 
                                    placeholderTextColor={"#5F606A"} 
                                    placeholder='Saisir son mail'
                                    returnKeyType="next"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onSubmitEditing={() => telephoneRef.current?.focus()} 
                                />
                                <EmailIcon size={28} color="#5F606A" />
                            </View>                            
                        </View>
                        <View className='w-full flex-col items-start justify-start gap-2'>
                            <Text className='text-xl text-gris-11 font-medium'>Téléphone</Text>
                            <View className="bg-gris-11/30 rounded-2xl px-4 w-full flex-row items-center justify-between gap-2">
                                <BottomSheetTextInput 
                                    ref={telephoneRef}
                                    value={telephone} 
                                    onChangeText={setTelephone} 
                                    className='py-4 text-xl text-gris-1 font-normal flex-1' 
                                    placeholderTextColor={"#5F606A"} 
                                    placeholder='Saisir son téléphone'
                                    keyboardType="phone-pad"
                                    returnKeyType="done"
                                />
                                <PhoneIcon size={28} color="#5F606A" />
                            </View>                            
                        </View>
                    </View>
                <TouchableOpacity 
                    disabled={isLoading}
                    onPress={modifierSonCompte}
                    activeOpacity={0.8} 
                    className='px-4 py-5 w-full rounded-full bg-violet-8 items-center justify-center'
                >
                    {
                        isLoading ?
                            <ActivityIndicator size="small" color="#EEEEF0" />
                            :
                            <Text className='text-xl text-gris-12 font-medium'>Enregistrer</Text>
                    }                        
                </TouchableOpacity>
            </View>
        </BottomSheetScrollView>
    )
}

export default ModifierSonCompte