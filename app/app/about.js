import { ScrollView } from "react-native";
import { View, Text, TextInput, Pressable, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router'
import { HomeIcon } from "../components/icons";

export default function About() {
    return (
        <ScrollView>
            <Text>Sobre FrigoApp</Text>

            <Text>Aliqua Lorem nostrud eu aliqua officia sint ullamco sint adipisicing mollit consequat dolor. Tempor culpa minim qui laborum aute cupidatat adipisicing id proident excepteur nostrud voluptate. Eiusmod ad sint quis commodo aliquip in minim irure excepteur aliquip cupidatat nostrud. Tempor amet ex occaecat elit exercitation dolore reprehenderit culpa. Id consequat esse eiusmod dolor fugiat ut dolore eu anim. Est quis eiusmod nostrud non elit proident proident aute quis eiusmod elit.</Text>

            <Text>Aliqua Lorem nostrud eu aliqua officia sint ullamco sint adipisicing mollit consequat dolor. Tempor culpa minim qui laborum aute cupidatat adipisicing id proident excepteur nostrud voluptate. Eiusmod ad sint quis commodo aliquip in minim irure excepteur aliquip cupidatat nostrud. Tempor amet ex occaecat elit exercitation dolore reprehenderit culpa. Id consequat esse eiusmod dolor fugiat ut dolore eu anim. Est quis eiusmod nostrud non elit proident proident aute quis eiusmod elit.</Text>

            <Text>Aliqua Lorem nostrud eu aliqua officia sint ullamco sint adipisicing mollit consequat dolor. Tempor culpa minim qui laborum aute cupidatat adipisicing id proident excepteur nostrud voluptate. Eiusmod ad sint quis commodo aliquip in minim irure excepteur aliquip cupidatat nostrud. Tempor amet ex occaecat elit exercitation dolore reprehenderit culpa. Id consequat esse eiusmod dolor fugiat ut dolore eu anim. Est quis eiusmod nostrud non elit proident proident aute quis eiusmod elit.</Text>

            {/* Para poder pasarle algun componente: botones, iconos... tenemos que pasarle una prop asChild  */}
            <Link asChild href="/Home">
                <Pressable>
                    <HomeIcon></HomeIcon>
                </Pressable>
            </Link>

        </ScrollView>
    )
}