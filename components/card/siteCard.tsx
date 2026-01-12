import { useFetchListSites } from '@/hooks/sites/useFetchSite';
import { Site } from '@/interfaces/site';
import DEV_API_URL from '@/utils/api';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SupprimerModal from '../modal/supprimerModal';

interface SiteCardProps {
    site: Site
}

const SiteCard = ({site}: SiteCardProps) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const { refetch } = useFetchListSites();

    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.9} className='border border-violet-10 bg-violet-5/70 p-4 rounded-xl w-full flex-col items-start justify-start gap-2'>
                <Text className='text-xl text-gris-12 font-bold'>{site.site}</Text>
                <View className='flex-1 flex-row items-start justify-start gap-2'>                                    
                    <View className='bg-violet-10 rounded-lg p-2 items-center justify-center'>
                        <Text className='text-gris-12 text-base font-semibold'>{site.heureDebut}</Text>
                    </View>
                    <View className='bg-violet-10 rounded-lg p-2 items-center justify-center'>
                        <Text className='text-gris-12 text-base font-semibold'>{site.heureFin}</Text>
                    </View>
                </View>            
            </TouchableOpacity>
            <SupprimerModal 
                visible={modalVisible}
                onClose={() => {setModalVisible(false); refetch()}}
                url={`${DEV_API_URL}/site/supprimer/${site.id}`}
                title='Supprimer un site'
                paragraph={`Êtes vous sûr de vouloir supprimer le site ${site.site} ?`}
            />
        </>
    )
}

export default SiteCard