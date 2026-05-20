import EmployeCard from '@/components/card/employeCard'
import RenderFooter from '@/components/footer/renderFooter'
import Loading from '@/components/loading/loading'
import { useDebounce } from '@/hooks/debounce/useDebounce'
import { useFetchListEmployes } from '@/hooks/employes/useFetchEmployes'
import { router } from 'expo-router'
import { Plus, Search } from 'lucide-react-native'
import React, { useState } from 'react'
import { FlatList, Pressable, RefreshControl, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const Employe = () => {
    const [recherche, setRecherche] = useState<string>('')
    const debouncedRecherche = useDebounce(recherche, 500)
    const { employes, isLoading, isFetchingNextPage, handleLoadMore, refetch } = useFetchListEmployes(debouncedRecherche.trim() || undefined)

    return (
        <View className="px-4 py-4 pt-10 pb-4 flex-1 items-center justify-start gap-6">
            <View className='relative w-full flex-row items-center justify-center'>
                <Text className='text-3xl text-gris-12 font-semibold'>Employés</Text>
                <Pressable onPress={() => router.push("/(employes)")} className="absolute right-0 size-10 z-50 rounded-full bg-violet-9 items-center justify-center">
                    <Plus size={28} color='#EEEEF0' />
                </Pressable>
            </View>
            <Text className='text-base text-gris-11 font-regular'>{employes.length} personnes travaillent avec vous</Text>
            <View style={{backgroundColor: 'rgb(68 28 127 / 0.5)', borderRadius: 12}} className="px-4 w-full flex-row items-center justify-between gap-1">
                <Search size={28} color="#EEEEF0" />
                <TextInput
                    value={recherche}
                    onChangeText={setRecherche}
                    className='flex-1 bg-transparent py-4 rounded-2xl text-xl text-gris-12' 
                    placeholderTextColor={"#5F606A"} 
                    placeholder='Rechercher un employé'
                    autoCapitalize="none"
                />                
            </View>
            <View className='w-full flex-1 items-center justify-start'>
                {
                    isLoading ?
                        <Loading />
                        :
                            employes.length === 0 ?
                                <Text className='text-xl text-gris-12 font-medium'>Aucun employé trouvé</Text>
                                :
                                <FlatList 
                                    horizontal={false}
                                    data={employes}                    
                                    renderItem={({item}) => <EmployeCard id={item.id} nom={item.nom} prenom={item.prenom} image={item.image} poste={item.poste} />}
                                    keyExtractor={(item) => item.id.toString()}
                                    className='w-full'
                                    contentContainerStyle={{paddingBottom: 88}}
                                    ListFooterComponent={<RenderFooter isFetchingNextPage={isFetchingNextPage} />}
                                    onEndReached={recherche.trim() ? undefined : handleLoadMore}
                                    onEndReachedThreshold={0.5}
                                    ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                                    showsVerticalScrollIndicator={false}
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
        </View>
    )
}

export default Employe