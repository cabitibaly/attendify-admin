import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { Calendar, LocaleConfig } from "react-native-calendars";

LocaleConfig.locales['fr'] = {
    monthNames: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
    ],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: "Aujourd'hui"
};

LocaleConfig.defaultLocale = 'fr';

interface CustomCalendarProps {
    selectedDate: string;
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
    handleClose?: () => void;
}

const CustomCalendar = ({setSelectedDate, selectedDate,handleClose}: CustomCalendarProps) => {       

    return (
        <View className='w-full'>
                <Calendar
                    onDayPress={day => {                        
                        setSelectedDate(day.dateString);
                        handleClose?.();
                    }}
                    markedDates={{
                        [selectedDate]: {
                            selected: true, 
                            disableTouchEvent: true,
                            selectedColor: "#7541CD"                            
                        }
                    }}
                    style={{
                        backgroundColor: "rgba(68, 28, 127, 1)",  
                        borderRadius: 12,
                    }}
                    theme={{                        
                        backgroundColor: "transparent",
                        calendarBackground: "transparent",
                        textSectionTitleColor: "#EEEEF0",
                        todayTextColor: '#7541CD',
                        textDisabledColor: '#5F606A',
                        monthTextColor: '#EEEEF0',
                        dayTextColor: '#EEEEF0',
                        textDayFontWeight: "medium",
                        textMonthFontWeight: "medium",                        
                    }}
                    renderArrow={(direction) => (
                        direction === "left" ? 
                            (
                                <View className='size-6 bg-violet-8 rounded-full items-center justify-center'>
                                    <ChevronLeft strokeWidth={1.5} size={20} color="#EEEEF0" />
                                </View>
                            )
                        :
                            (
                                <View className='size-6 bg-violet-8 rounded-full items-center justify-center'>
                                    <ChevronRight strokeWidth={1.5} size={20} color="#EEEEF0" />
                                </View>
                            )  
                    )}
                />
        </View>
    )
}

export default CustomCalendar