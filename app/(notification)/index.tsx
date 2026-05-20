import NotificationCard from '@/components/card/notificationCard'
import RenderFooter from '@/components/footer/renderFooter'
import Loading from '@/components/loading/loading'
import { useFetchListNotification } from '@/hooks/notification/useFetchNotification'
import { router } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import React from 'react'
import { FlatList, ImageBackground, Pressable, RefreshControl, Text, View } from 'react-native'

const NotificationList = () => {
    const { notifications, isLoading, isFetchingNextPage, handleLoadMore, refetch } = useFetchListNotification()

    return (
        <ImageBackground
            source={require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 py-4 pt-10 pb-4 flex-1 items-center justify-start gap-6"
        >
            <View className='relative w-full flex-row items-center justify-center'>
                <Pressable onPress={() => router.back()} className="absolute left-0 size-10 z-50 rounded-full bg-violet-9 items-center justify-center">
                    <ChevronLeft strokeWidth={1.75} size={28} color='#EEEEF0' />
                </Pressable>
                <Text className='text-3xl text-gris-12 font-semibold'>Notification</Text>
            </View>
            {
                isLoading ?
                    <Loading />
                    :
                    notifications.length === 0 ?
                        <View className='flex-1 items-center justify-center gap-4'>
                            <Text className='text-xl text-gris-12 font-medium'>Aucune notification</Text>
                        </View>
                        :
                        <FlatList 
                            data={notifications}                    
                            renderItem={({item}) => <NotificationCard notification={item} refetch={refetch} />}
                            keyExtractor={(item) => item.id.toString()}
                            className='w-full'
                            contentContainerStyle={{paddingBottom: 88}}
                            ListFooterComponent={<RenderFooter isFetchingNextPage={isFetchingNextPage} />}
                            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                            showsVerticalScrollIndicator={false}
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
            }            
        </ImageBackground>
    )
}

export default NotificationList