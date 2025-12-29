import { Stack } from 'expo-router'
import React from 'react'

const EmployesLayout = () => {    

    return (
        <Stack
            screenOptions={{
                contentStyle: {
                    backgroundColor: "#1A132C"
                }
            }}
        >
            <Stack.Screen 
                name="index" 
                options={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: "#1A132C"
                    }                 
                }}
            />
        </Stack>
    )
}

export default EmployesLayout