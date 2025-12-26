import EmployeCard from '@/components/card/employeCard'
import { router } from 'expo-router'
import { Plus, Search } from 'lucide-react-native'
import React from 'react'
import { ImageBackground, Pressable, ScrollView, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const Employe = () => {
    return (
        <ImageBackground
            source={require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 py-4 pt-10 pb-4 flex-1 items-center justify-start gap-6"
        >
            <View className='relative w-full flex-row items-center justify-center'>
                <Text className='text-3xl text-gris-12 font-semibold'>Employés</Text>
                <Pressable onPress={() => router.push("/")} className="absolute right-0 size-10 z-50 rounded-full bg-violet-9 items-center justify-center">
                    <Plus size={28} color='#EEEEF0' />
                </Pressable>
            </View>
            <Text className='text-base text-gris-11 font-regular'>10 personnes travaillent avec vous</Text>
            <View style={{backgroundColor: 'rgb(68 28 127 / 0.5)', borderRadius: 12}} className="px-4 w-full flex-row items-center justify-between gap-1">
                <Search size={28} color="#EEEEF0" />
                <TextInput
                    className='flex-1 bg-transparent py-4 rounded-2xl text-xl text-gris-12' 
                    placeholderTextColor={"#5F606A"} 
                    placeholder='Rechercher un employé'
                    autoCapitalize="none"
                />                
            </View>
            <ScrollView                                   
                contentContainerStyle={{gap: 16, width: '100%', paddingBottom: 88, paddingRight: 4}} 
            >
                <EmployeCard 
                    id={1}
                    nom="Santa"
                    prenom="Dear"
                    image={require("../../assets/images/Dear-Santa.jpeg")}
                    poste="Nettoyeur"
                />
                <EmployeCard 
                    id={1}
                    nom="Enjin"
                    prenom=""
                    image={require("../../assets/images/Enjin.jpeg")}
                    poste="Nettoyeur"
                />
                <EmployeCard 
                    id={1}
                    nom="Surebrec"
                    prenom="Rudo"
                    image={require("../../assets/images/rudo.jpeg")}
                    poste="Nettoyeur"
                />
                <EmployeCard 
                    id={1}
                    nom="Hebby"
                    prenom="Guita"
                    image={require("../../assets/images/guita.jpeg")}
                    poste="Nettoyeur"
                />
                <EmployeCard 
                    id={1}
                    nom="Nijiku"
                    prenom="Zanka"
                    image={require("../../assets/images/zaka.jpeg")}
                    poste="Nettoyeur"
                />
                <EmployeCard 
                    id={1}
                    nom="Semiu"
                    prenom=""
                    image={require("../../assets/images/semiu.jpeg")}
                    poste="Nettoyeur"
                />
                <EmployeCard 
                    id={1}
                    nom="Reaper"
                    prenom="Ryo"
                    image={require("../../assets/images/riyo.jpeg")}
                    poste="Nettoyeur"
                />
            </ScrollView>
        </ImageBackground>
    )
}

export default Employe