import DEV_API_URL from '@/utils/api'
import { authenticatedRequest } from '@/utils/authUtils'
import { BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useRef, useState } from 'react'
import { ActivityIndicator, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import EyeIcon from '../svg/eyeIcon'
import EyeOffIcon from '../svg/eyeOffIcon'

interface RequestResponse {
    message: string,
    status: number, 
}

const ModifierSonMP = ({onClose}: {onClose: () => void}) => {
    const [ancien, setAncien] = useState<string>("");
    const [nouveau, setNouveau] = useState<string>("");
    const [showOld, setShowOld] = useState<boolean>(false);
    const [showNew, setShowNew] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const ancienRef = useRef<TextInput>(null);
    const nouveauRef = useRef<TextInput>(null);

    const modifierMotDePasse = async () => {
        if(!ancien || !nouveau) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: "Veuillez remplir tous les champs",
            })
            return;
        }

        if (nouveau.length < 8) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: "Veuillez entrer un mot de passe long",
            })
            return;
        }

        if (ancien === nouveau) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: "Veuillez entrer un mot de passe différent",
            })
            return;
        }

        setIsLoading(true)

        try {
            const data = await authenticatedRequest<RequestResponse>({
                url: `${DEV_API_URL}/compte/modifier-son-mot-de-passe`,
                method: 'PATCH',
                data: {
                    ancien,
                    nouveau
                }
            })

            if (data?.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Modification',
                    text2: data.message,
                })

                setTimeout(() => {
                    onClose()
                }, 200)
            }
            
        } catch (error) {
            console.log("une erreur est survenue:", error)
        } finally { setIsLoading(false) }

    }

    return (
        <BottomSheetView 
            className="px-4 py-2"
            style={{ paddingBottom: 8 }}                                                   
        >
            <View className="w-full flex-col items-center justify-start gap-6">
                <Text className="text-gris-1 text-2xl font-medium">Modifier son mot de passe</Text>
                <View className="w-full flex-col items-center justify-start gap-8">
                    <View className='w-full flex-col items-start justify-start gap-2'>
                        <Text className='text-xl text-gris-11 font-medium'>Ancien mot de passe</Text>
                        <View className="px-4 bg-gris-11/30 rounded-2xl w-full flex-row items-center justify-between gap-2">
                            <BottomSheetTextInput 
                                ref={ancienRef}
                                value={ancien}
                                onChangeText={setAncien}
                                secureTextEntry={!showOld} 
                                className='flex-1 bg-transparent py-4 rounded-2xl text-xl text-gris-1' 
                                placeholderTextColor={"#5F606A"} 
                                placeholder='Saisir son ancien mot de passe' 
                                returnKeyType="next"                                    
                                autoCapitalize="none"
                                onSubmitEditing={() => ancienRef.current?.focus()}
                            />
                            <Pressable onPress={() => setShowOld(!showOld)}>
                                { showOld ? <EyeIcon size={28} color="#5F606A" /> : <EyeOffIcon size={28} color="#5F606A" /> }
                            </Pressable> 
                        </View>                            
                    </View>
                    <View className='w-full flex-col items-start justify-start gap-2'>
                        <Text className='text-xl text-gris-11 font-medium'>Nouveau mot de passe</Text>
                        <View className="px-4 bg-gris-11/30 rounded-2xl w-full flex-row items-center justify-between gap-2">
                            <BottomSheetTextInput 
                                ref={nouveauRef}
                                value={nouveau}
                                onChangeText={setNouveau}
                                secureTextEntry={!showNew} 
                                className='flex-1 bg-transparent py-4 rounded-2xl text-xl text-gris-1' 
                                placeholderTextColor={"#5F606A"} 
                                placeholder='Saisir son nouveau mot de passe' 
                                returnKeyType="done"                                    
                                autoCapitalize="none"
                                onSubmitEditing={() => nouveauRef.current?.focus()}
                            />
                            <Pressable onPress={() => setShowNew(!showNew)}>
                                { showNew ? <EyeIcon size={28} color="#5F606A" /> : <EyeOffIcon size={28} color="#5F606A" /> }
                            </Pressable>                            
                        </View>                                                    
                    </View>
                </View>
                <TouchableOpacity 
                    disabled={isLoading}
                    onPress={modifierMotDePasse}
                    activeOpacity={0.8} 
                    className='mb-6 px-4 py-5 w-full rounded-full bg-violet-8 items-center justify-center'
                >
                    {
                        isLoading ?
                            <ActivityIndicator size="small" color="#EEEEF0" />
                            :
                            <Text className='text-xl text-gris-12 font-medium'>Soumettre</Text>
                    }                        
                </TouchableOpacity>
            </View>
        </BottomSheetView>
    )
}

export default ModifierSonMP