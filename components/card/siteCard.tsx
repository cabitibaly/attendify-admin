import { useFetchListSites } from '@/hooks/sites/useFetchSite';
import { Site } from '@/interfaces/site';
import DEV_API_URL from '@/utils/api';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SupprimerModal from '../modal/supprimerModal';
import MapPinIcon2 from '../svg/mapPinIcon2';

interface SiteCardProps {
    site: Site
}

const SiteCard = ({site}: SiteCardProps) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const { refetch } = useFetchListSites();

    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.9} className='bg-violet-5/70 p-2.5 rounded-xl w-full flex-row items-start justify-start gap-2'>
                <MapPinIcon2 size={24} color='#EEEEF0' />
                <View className='flex-1 flex-col items-start justify-start gap-1'>                
                    <Text className='text-xl text-gris-12 font-medium'>{site.site}</Text>
                    <Text className='text-base text-gris-11 font-medium'>{site.latitude}, {site.longitude}</Text>                
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