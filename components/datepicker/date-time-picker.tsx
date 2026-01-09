import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Clock4 } from 'lucide-react-native';
import React, { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

interface DatePickerProps {
    onDateChange: React.Dispatch<React.SetStateAction<Date>>;
    defaultTime: Date;
}

const CustomDateTimePicker = ({ onDateChange, defaultTime }: DatePickerProps) => {

    const [visible, setVisible] = useState<boolean>(false);    
    const [time, setTime] = useState<Date>(defaultTime);

    const onChange = (event: DateTimePickerEvent, selectedTime?: Date): void => {
        const currentTime = selectedTime || time;
        setVisible(Platform.OS === 'ios');
        setTime(currentTime);
        onDateChange(currentTime);
    };

    const showTimePicker = (): void => {
        setVisible(true);
    };

    const formatTime = (date: Date): string => {
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <View className='relative w-full'>
            <TouchableOpacity 
                onPress={showTimePicker}
                activeOpacity={0.8} 
                className='p-4 rounded-xl bg-violet-5 w-full flex-row items-center justify-start gap-3'
            >
                <Clock4 size={28} color='#7541CD' />
                <Text className='text-xl text-gris-12 font-medium'>{formatTime(time)}</Text>
            </TouchableOpacity>
            {
                visible && (
                    <DateTimePicker 
                        value={time}
                        mode="time"
                        is24Hour={true}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onChange}                        
                    />
                )
            }
        </View>
    )
}

export default CustomDateTimePicker