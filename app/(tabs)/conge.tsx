import React from 'react'
import { ImageBackground, Text } from 'react-native'

const Conge = () => {
    return (
        <ImageBackground
            source={require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="p-4 flex-1 items-center justify-center bg-turquoise-4"
        >
            <Text>Congé</Text>
        </ImageBackground>
    )
}

export default Conge