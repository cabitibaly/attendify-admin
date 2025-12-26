import PointageCard from '@/components/card/pointageCard'
import CustomBottomSheet, { CustomBottomSheetRef } from '@/components/custom-bottom-sheet/customBottomSheet'
import CustomCalendar from '@/components/datepicker/customCalendar'
import DatePicker from '@/components/datepicker/datePicker'
import ExportIcon from '@/components/svg/exportIcon'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import { router } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import React, { useRef, useState } from 'react'
import { ImageBackground, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const Historique = () => {
    const [selected, setSelected] = useState<string>('')
    const [dateDebut, setDateDebut] = useState<string>('')
    const [dateFin, setDateFin] = useState<string>('')
    const bottomSheetRef = useRef<CustomBottomSheetRef>(null);

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
            <ScrollView 
                className='rounded-xl'                    
                contentContainerStyle={{gap: 12, width: '100%', paddingRight: 4}}                    
            >
                <PointageCard />
                <PointageCard />
                <PointageCard />
                <PointageCard />
            </ScrollView>
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