import { Stack } from 'expo-router'
import React from 'react'

const SiteLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen 
                name="index"
            />
            <Stack.Screen 
                name="nouveauSite"
            />
        </Stack>
    )
}

export default SiteLayout