import PointageCard from '@/components/card/pointageCard'
import CustomBottomSheet, { CustomBottomSheetRef } from '@/components/custom-bottom-sheet/customBottomSheet'
import CustomCalendar from '@/components/datepicker/customCalendar'
import DatePicker from '@/components/datepicker/datePicker'
import RenderFooter from '@/components/footer/renderFooter'
import Loading from '@/components/loading/loading'
import ExportIcon from '@/components/svg/exportIcon'
import { useFetchPointage } from '@/hooks/pointage/useFetchPointage'
import { exportPointage } from '@/utils/exportPointage'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import { router } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import React, { useRef, useState } from 'react'
import { FlatList, ImageBackground, Pressable, RefreshControl, Text, TouchableOpacity, View } from 'react-native'

const Historique = () => {
    const [selected, setSelected] = useState<string>(new Date().toISOString().split('T')[0])
    const [dateDebut, setDateDebut] = useState<string>('')
    const [dateFin, setDateFin] = useState<string>('')
    const bottomSheetRef = useRef<CustomBottomSheetRef>(null);
    const { pointages, isFetchingNextPage, isLoading, refetch }  = useFetchPointage(selected == "", new Date(selected).toISOString());    

    const handleExport = async () => {
        const fileUri = await exportPointage(dateDebut, dateFin)
        console.log(fileUri)
    }

    return (
        <ImageBackground
            source={require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 py-4 pt-10 pb-4 flex-1 items-center justify-start gap-6"
        >
            <View className='w-full flex-row items-center justify-between'>
                <Pressable onPress={() => router.back()} className="size-10 z-50 rounded-full bg-violet-9 items-center justify-center">
                    <ChevronLeft strokeWidth={1.75} size={28} color='#EEEEF0' />
                </Pressable>
                <Text className='text-3xl text-gris-12 font-semibold'>Historique</Text>
                <Pressable onPress={() => bottomSheetRef.current?.open()} className="size-10 z-50 rounded-full bg-violet-9 items-center justify-center">
                    <ExportIcon size={28} color='#EEEEF0' />
                </Pressable>
            </View> 
            <CustomCalendar selectedDate={selected} setSelectedDate={setSelected} />   
            <View className='w-full rounded-xl items-center'>
                {
                    isLoading ?
                        <Loading />   
                        :   
                            pointages.length === 0 ?
                                <Text className='text-xl text-gris-12 font-medium'>Aucun pointage trouvé</Text>
                                :
                                <FlatList 
                                    horizontal={false}
                                    data={pointages}                    
                                    renderItem={({item}) => <PointageCard pointage={item} />}
                                    keyExtractor={(item) => item.id.toString()}
                                    className='w-full'
                                    contentContainerStyle={{paddingBottom: 88}}
                                    ListFooterComponent={<RenderFooter isFetchingNextPage={isFetchingNextPage} />}
                                    ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
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
            <CustomBottomSheet
                ref={bottomSheetRef}
                onClose={() => console.log('fermé')}
            >
                <BottomSheetView
                    className="px-4 py-2"
                    style={{ paddingBottom: 8 }}
                >
                    <View className="w-full flex-col items-center justify-start gap-6">
                        <Text className="text-gris-1 text-2xl font-medium">Exporter sur une période</Text>
                        <View className="w-full flex-col items-center justify-start gap-4">
                            <View className='w-full flex-col items-start justify-start gap-2'>
                                <Text className='text-xl text-gris-11 font-medium'>Du</Text>
                                <DatePicker 
                                    setSelectedDate={setDateDebut} 
                                    selectedDate={dateDebut} 
                                    iconColor='#5F606A'
                                    backgroundColor='rgb(178 179 189 / 0.3)'
                                    textColor='#111113'
                                />
                            </View>
                            <View className='w-full flex-col items-start justify-start gap-2'>
                                <Text className='text-xl text-gris-11 font-medium'>Au</Text>
                                <DatePicker 
                                    setSelectedDate={setDateFin} 
                                    selectedDate={dateFin} 
                                    iconColor='#5F606A'
                                    backgroundColor='rgb(178 179 189 / 0.3)'
                                    textColor='#111113'
                                />
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={handleExport} 
                            activeOpacity={0.8} 
                            className='mb-6 px-4 py-4 w-full rounded-full bg-violet-8 items-center justify-center'
                        >
                            <Text className='text-xl text-gris-12 font-medium'>Exporter</Text>    
                        </TouchableOpacity>
                    </View>
                </BottomSheetView>
            </CustomBottomSheet>
        </ImageBackground>
    )
}

export default Historique