import { View, Pressable } from "react-native";
import { Slot, Stack, Link } from "expo-router";
import { CircleInfoIcon } from "../components/icons";

export default function Layout() {
    <View style={{ flex: 1 }}>
        {/* <Text>Hola</Text> */}
        <Stack
            screenOptions={{
                gestureEnabled: true, // Habilita los gestos
                gestureDirection: 'horizontal', // Dirección del gesto
            }}
        />
    </View>
}