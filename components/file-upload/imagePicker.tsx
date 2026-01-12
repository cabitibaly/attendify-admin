import DEV_API_URL from '@/utils/api';
import { authenticatedRequest, getToken } from '@/utils/authUtils';
import { uploadHandler } from '@/utils/uploaderHandler';
import * as DocumentPicker from 'expo-document-picker';
import { Camera } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

interface RequestResponse {
    message: string,
    status: number, 
}
interface FileUpdoaldProps {
    image: DocumentPicker.DocumentPickerAsset | null | string;
    setImage: React.Dispatch<React.SetStateAction<DocumentPicker.DocumentPickerAsset | null | string>>;
}

const ImagePicker = ({image, setImage}: FileUpdoaldProps) => {      

    const pickFile = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'image/*',
            copyToCacheDirectory: false,
            multiple: false,
        })

        if (!result.canceled) {
            const imageUplaoded = await uploadHandler(result.assets[0])

            if (imageUplaoded) {
                const refresh_token = await getToken('REFRESH')
                
                const data = await authenticatedRequest<RequestResponse>({
                    url: `${DEV_API_URL}/compte/modifier-un-compte`,
                    method: 'PATCH',
                    data: {
                        image: imageUplaoded,
                        refresh_token
                    }
                })

                if (data?.status === 200) {
                    Toast.show({
                        type: 'success',
                        text1: 'Modification',
                        text2: data.message,
                    })
                    setImage(imageUplaoded)
                }
            }            
        }
    }

    return (
        <View className='relative'>
            <TouchableOpacity onPress={pickFile} activeOpacity={0.8} className=' overflow-hidden size-32 rounded-full bg-turquoise-8 items-center justify-center'>
                {
                    image ?
                        <Image className='size-full' source={{ uri: typeof image === "string" ? image : image.uri }} />
                        : 
                        <Text className='text-gris-12 text-5xl font-bold'>
                            C
                        </Text>
                }            
            </TouchableOpacity>
            <View className='absolute bottom-0 right-4 size-6 bg-violet-8 rounded-2xl items-center justify-center'>
                <Camera strokeWidth={2.5} size={14} color={"#EEEEF0"} />
            </View>
        </View>
    )
}

export default ImagePicker