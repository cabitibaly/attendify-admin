import { BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useRef, useState } from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import EyeIcon from '../svg/eyeIcon'
import EyeOffIcon from '../svg/eyeOffIcon'

const ModifierSonMP = () => {
    const [ancien, setAncien] = useState("12345678");
    const [nouveau, setNouveau] = useState("12345678");
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);

    const ancienRef = useRef<TextInput>(null);
    const nouveauRef = useRef<TextInput>(null);

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
                    activeOpacity={0.8} 
                    className='mb-6 px-4 py-5 w-full rounded-full bg-violet-8 items-center justify-center'
                >
                    <Text className='text-xl text-gris-12 font-medium'>Enregistrer</Text>    
                </TouchableOpacity>
            </View>
        </BottomSheetView>
    )
}

export default ModifierSonMP