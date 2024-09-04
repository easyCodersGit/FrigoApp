
import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { CircleInfoIcon, OptionsIcon, SearchIcon, LogoutIcon, AlarmIcon, ShopIcon, HomeIcon, FridgeIcon } from '../components/icons'

import { BackgroundImage } from '../components/background'


export default function ShoppingList() {
return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
        <BackgroundImage />

        <View style={styles.buttonContainer}>
                <View style={styles.rightIcons}>
                    <Link asChild href="/Home">
                        <Pressable style={styles.iconButton}>
                            <HomeIcon />
                        </Pressable>
                    </Link>

                    

                    <Link asChild href="/about">
                        <Pressable style={styles.iconButton}>
                            <ShopIcon />
                        </Pressable>
                    </Link>

                    <Link asChild href="/about">
                        <Pressable style={styles.iconButton}>
                            <OptionsIcon />
                        </Pressable>
                    </Link>

                    <Link asChild href="/">
                        <Pressable style={styles.iconButton}>
                            <LogoutIcon />
                        </Pressable>
                    </Link>
                </View>
            </View>

      
    </ScrollView>
)
}

const styles = StyleSheet.create({
contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
},

rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
},
iconButton: {
    marginHorizontal: 10,
},
buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 15
  
},

})


