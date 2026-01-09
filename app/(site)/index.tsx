import SiteCard from '@/components/card/siteCard'
import RenderFooter from '@/components/footer/renderFooter'
import { useFetchListSites } from '@/hooks/sites/useFetchSite'
import { router } from 'expo-router'
import { ChevronLeft, Plus } from 'lucide-react-native'
import React from 'react'
import { FlatList, ImageBackground, Pressable, RefreshControl, Text, View } from 'react-native'

const ListeDesSites = () => {
    const { sites, isLoading, isFetchingNextPage, handleLoadMore, refetch } = useFetchListSites()

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
                <Pressable onPress={() => router.push("/(site)/nouveau-site")} className="size-10 z-50 rounded-full bg-violet-9 items-center justify-center">
                    <Plus size={28} color='#EEEEF0' />
                </Pressable>
            </View>
            <View className='w-full'>            
                <FlatList 
                    data={sites}
                    renderItem={({item}) => <SiteCard site={item} />}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{gap: 12, width: '100%', paddingBottom: 88, paddingRight: 4}}
                    ListFooterComponent={<RenderFooter isFetchingNextPage={isFetchingNextPage} />}                                
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    windowSize={5}                    
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    removeClippedSubviews={true}
                    updateCellsBatchingPeriod={50}
                    refreshControl={
                        <RefreshControl 
                            refreshing={isLoading} 
                            onRefresh={refetch} 
                        />
                    }
                />
            </View>
        </ImageBackground>
    )
}

export default ListeDesSites