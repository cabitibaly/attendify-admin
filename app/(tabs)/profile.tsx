import CustomBottomSheet, { CustomBottomSheetRef } from '@/components/custom-bottom-sheet/customBottomSheet';
import ImagePicker from '@/components/file-upload/imagePicker';
import ModifierSonCompte from '@/components/profile/modifierSonCompte';
import ModifierSonMP from '@/components/profile/modifierSonMP';
import { ArrowCircleRightIcon } from '@/components/svg/arrowCircleRight';
import { EditIcon } from '@/components/svg/editIcon';
import { LogoutIcon2 } from '@/components/svg/logoutIcon2';
import MapPin from '@/components/svg/mapPin';
import { PasswordIcon } from '@/components/svg/passwordIcon';
import { useAuth } from '@/hooks/auth/useAuth';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Profile = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const editBottomSheetRef = useRef<CustomBottomSheetRef>(null);
    const pwdBottomSheetRef = useRef<CustomBottomSheetRef>(null);
    const [image, setImage] = useState<DocumentPicker.DocumentPickerAsset | null | string>(null);
    const { logout, utilisateur } = useAuth();

    useEffect(() => {
        
        if (utilisateur && utilisateur.image) {
            setImage(utilisateur.image)
        }

    }, [utilisateur])

    const handleLogout = async () => {
        setIsLoading(true)

        try {
            await logout()
            router.replace("/(auth)")
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <View className="pb-4 flex-1 items-center justify-start gap-4">
            <View className='bg-violet-5/30 p-4 rounded-[49px] w-full h-2/5 items-center justify-center gap-3'>
                <TouchableOpacity onPress={() => {editBottomSheetRef.current?.open()}} activeOpacity={0.8} className='absolute top-12 right-4 size-10 rounded-full bg-violet-9/30 items-center justify-center'>
                    <EditIcon size={20} color='#EEEEF0' />
                </TouchableOpacity>
                <ImagePicker image={image} setImage={setImage} />
                {/* <View className='overflow-hidden size-32 rounded-full bg-violet-8 items-center justify-center'>                    
                    {
                        utilisateur?.image ?
                            <Image className='size-full' source={{ uri: utilisateur?.image }} /> 
                            : 
                            <Text className='text-gris-12 text-2xl font-bold'>
                                {utilisateur?.prenom.charAt(0).toUpperCase()}
                            </Text>
                    }
                </View> */}
                <View className='w-full flex-col items-center justify-center gap-1'>
                    <Text className='text-gris-12 text-4xl font-bold'>{utilisateur?.nom} {utilisateur?.prenom}</Text>
                    <Text className='text-gris-12 text-xl font-regular'>{utilisateur?.poste}</Text>
                </View>
            </View>
            <View className='w-full p-4 flex-col items-center justify-center gap-4'>
                <TouchableOpacity onPress={() => pwdBottomSheetRef.current?.open()} activeOpacity={0.8} className='p-4 w-full bg-violet-5/30 rounded-xl flex-row items-center justify-between'>
                    <View className='flex-row items-center justify-center gap-2.5'>
                        <PasswordIcon size={32} color='#7541CD' />
                        <Text className='text-gris-12 text-xl font-medium'>Mot de passe</Text>
                    </View>
                    <ArrowCircleRightIcon size={32} color='#7541CD' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/(site)")} activeOpacity={0.8} className='p-4 w-full bg-violet-5/30 rounded-xl flex-row items-center justify-between'>
                    <View className='flex-row items-center justify-center gap-2.5'>
                        <MapPin size={28} color='#7541CD' />
                        <Text className='text-gris-12 text-xl font-medium'>Site</Text>
                    </View>
                    <ArrowCircleRightIcon size={32} color='#7541CD' />
                </TouchableOpacity>
                <TouchableOpacity disabled={isLoading} onPress={handleLogout} activeOpacity={0.8} className='p-4 w-full bg-violet-5/30 rounded-xl flex-row items-center justify-between'>
                    <View className='flex-row items-center justify-center gap-2.5'>
                        <LogoutIcon2 size={32} color='#7541CD' />
                        <Text className='text-gris-12 text-xl font-medium'>Déconnexion</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <CustomBottomSheet 
                ref={editBottomSheetRef}
                onClose={() => console.log('Fermé')}
                snapPoints={["70%", "90%", "99%"]}
            >
                <ModifierSonCompte onClose={() => editBottomSheetRef.current?.close()} />
            </CustomBottomSheet>
            <CustomBottomSheet 
                ref={pwdBottomSheetRef}                
                onClose={() => console.log('Fermé')}
            >
                <ModifierSonMP onClose={() => pwdBottomSheetRef.current?.close()} />
            </CustomBottomSheet>
        </View>
    )
}

export default Profile