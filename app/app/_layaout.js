import { View, Pressable } from "react-native"
import { Slot, Stack, Link } from "expo-router"
import { CircleInfoIcon } from "../components/icons"
import { BackgroundImage } from "../components/background"

export default function Layout() {
    <View style={{ flex: 1 }}>
         <BackgroundImage />

        <Stack
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: 'horizontal',
            }}
        />
    </View>
}