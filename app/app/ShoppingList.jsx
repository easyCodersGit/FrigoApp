
import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import { ScrollView, View, Text, Pressable, StyleSheet, FlatList } from 'react-native'
import { Link } from 'expo-router'
import { ButtonBlue, ButtonSecondary } from '../components/buttons'
import { CircleInfoIcon, OptionsIcon, SearchIcon, LogoutIcon, AlarmIcon, ShopIcon, HomeIcon, FridgeIcon, DeleteIcon } from '../components/icons'

import { BackgroundImage } from '../components/background'
import { AlarmIconWithBadge } from '../library/AlarmIconWithBadge'

import Items from '../components/Items'
import Item from '../components/Item'

import retrieveActiveProducts from '../logic/retrieveActiveproducts'
import checkStatusAlarm from '../logic/checkStatusAlarm'
import checkUser from '../logic/checkUser'

import session from '../logic/session'

export default function ShoppingList() {

    const [products, setProducts] = useState([])
    const [userId, setUserId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userName, setUserName] = useState('')
    const [hasActiveAlarms, setHasActiveAlarms] = useState(false) 

    const router = useRouter()

   
    useEffect(() => {
        const fetchProductsWithAlarms = async () => {
            try {
                const sessionUserId = await session.getSessionUserId()
                if (sessionUserId) {
                    setUserId(sessionUserId)
                    const name = await checkUser(sessionUserId)
                    setUserName(name)
    
                    // Recuperar productos con alarmas
                    const fetchedProducts = await retrieveActiveProducts(sessionUserId)
                    
                    // Eliminar duplicados (basado en el id del producto)
                    const uniqueProducts = fetchedProducts.filter((product, index, self) => 
                        index === self.findIndex((p) => p.id === product.id)
                    )
    
                    setProducts(uniqueProducts)
    
                    const alarmStatusChecked = await checkStatusAlarm(sessionUserId)
                    setHasActiveAlarms(alarmStatusChecked)

                } else {
                    console.error('No userId found in session')
                }
            } catch (error) {
                console.error('Error fetching user data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProductsWithAlarms()
    }, [])

    const handleDeleteProduct = (productId) => {
        setProducts(prevProducts => prevProducts.filter(product => product.id !== productId))
    }

    if (loading) {
        return <Text>Loading...</Text>
    }


return (
    <View style={{ flex: 1 }}>
         <BackgroundImage />
       

<FlatList
    ListHeaderComponent={(
        <>
            <View style={styles.buttonContainer}>
                <View style={styles.rightIcons}>
                    <Link asChild href="/Home">
                        <Pressable style={styles.iconButton}>
                            <HomeIcon />
                        </Pressable>
                    </Link>
                    <Pressable
                        style={styles.iconButton}
                        onPress={() => router.push({ pathname: '/AlarmsPage', params: { userId } })}
                    >
                        <AlarmIconWithBadge hasActiveAlarms={hasActiveAlarms} />
                    </Pressable>
                    <Link asChild href="/about">
                        <Pressable style={styles.iconButton}>
                            <ShopIcon />
                        </Pressable>
                    </Link>
                    <Link asChild href="/Profile">
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
            <Text style={styles.welcomeText}>{userName}, You need to buy this!</Text>
        </>
    )}
    data={products}
    renderItem={({ item }) => (
        <Item product={item} onDelete={handleDeleteProduct} />
    )}
    keyExtractor={(item) => item.id.toString()}
/>


        <View style={styles.deleteButtonContainer}>
            <ButtonSecondary
                label="Clean List"
                onPress={() => setProducts([])}
            />
        </View>
    </View>
)
}

const styles = StyleSheet.create({
buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 15,
},
rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10
},
iconButton: {
    marginHorizontal: 10,
},
welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: 'center',
    width: '100%',
},
deleteButtonContainer: {
   
    alignItems: 'center',
},
})