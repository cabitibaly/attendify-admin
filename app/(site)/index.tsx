import SiteCard from '@/components/card/siteCard'
import { router } from 'expo-router'
import { ChevronLeft, Plus } from 'lucide-react-native'
import React from 'react'
import { FlatList, ImageBackground, Pressable, Text, View } from 'react-native'

const data = [
    { id : 1, nom: "POWERTECH SARL Site du 22", position: "11.18958219733645, -4.314583148593074" },
    { id : 2, nom: "POWERTECH SARL Site Belle ville", position: "11.18958219733645, -4.314583148593074" },
]

const ListeDesSites = () => {
    return (
        <ImageBackground
            source={
                require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 py-4 pt-10 pb-4 flex-1 items-center justify-start gap-8 bg-violet-2"
        >
            <View className='relative w-full flex-row items-center justify-between'>
                <Pressable onPress={() => router.back()} className="size-10 z-50 rounded-full bg-violet-9 items-center justify-center">
                    <ChevronLeft strokeWidth={1.75} size={28} color='#EEEEF0' />
                </Pressable>
                <Text className='text-3xl text-gris-12 font-semibold'>Liste des sites</Text>
                <Pressable onPress={() => router.push("/(site)/nouveauSite")} className="size-10 z-50 rounded-full bg-violet-9 items-center justify-center">
                    <Plus size={28} color='#EEEEF0' />
                </Pressable>
            </View>
            <View className='w-full'>            
                <FlatList 
                    data={data}
                    renderItem={({item}) => <SiteCard id={item.id}  nom={item.nom} position={item.position} />}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{gap: 12, width: '100%', paddingBottom: 88, paddingRight: 4}}
                />
            </View>
        </ImageBackground>
    )
}

export default ListeDesSites