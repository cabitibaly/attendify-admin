import CongeCard from '@/components/card/congeCard'
import RenderFooter from '@/components/footer/renderFooter'
import Loading from '@/components/loading/loading'
import { useFetchListConges } from '@/hooks/conge/useFetchConge'
import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'

const EnAttente = () => {
    const { conges, isLoading, isFetchingNextPage, handleLoadMore, refetch } = useFetchListConges(1)

    useEffect(() => {
        refetch()
    }, [])

    return (
        <View className='pt-6 flex-1 items-center justify-start bg-transparent gap-4'>
            {
                isLoading ?
                    <Loading />
                    :            
                    <FlatList 
                        data={conges}
                        renderItem={({item}) => <CongeCard conge={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{gap: 12, width: '100%', paddingBottom: 88}}
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
            }
        </View>
    )
}

export default EnAttente