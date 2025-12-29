import CongeCard from '@/components/card/congeCard'
import React from 'react'
import { FlatList, View } from 'react-native'

const data = [
    {id: 1, statut: 'En attente'},
    {id: 2, statut: 'En attente'},
    {id: 3, statut: 'En attente'},
]

const EnAttente = () => {
    return (
        <View className='pt-6 flex-1 items-center justify-start bg-transparent gap-4'>
            <FlatList 
                data={data}
                renderItem={({item}) => <CongeCard id={item.id} statut={item.statut} />}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{gap: 12, width: '100%', paddingBottom: 88, paddingRight: 4}}
            />
        </View>
    )
}

export default EnAttente