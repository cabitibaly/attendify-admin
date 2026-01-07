import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const Loading = () => {
    return (
        <View 
            className="bg-transparent flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#EEEEF0" />
        </View>
    )
}

export default Loading