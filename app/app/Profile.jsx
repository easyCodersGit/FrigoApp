import React, { useState, useEffect } from 'react'
import { useRouter, Link } from 'expo-router'
import { View, TextInput, Pressable, StyleSheet, ImageBackground, Text, Modal } from 'react-native'
import loginUser from '../logic/loginUser'
import { CircleInfoIcon, OptionsIcon, SearchIcon, LogoutIcon, AlarmIcon, ShopIcon, HomeIcon } from '../components/icons'
import { ButtonBlue, ButtonSecondary } from '../components/buttons'
import { Input } from '../components/input'
import { BackgroundImage } from '../components/background'
import changeEmail from '../logic/changeEmail'
import changePassword from '../logic/changePassword'
import checkStatusAlarm from '../logic/checkStatusAlarm'
import { AlarmIconWithBadge } from '../library/AlarmIconWithBadge'
import session from '../logic/session'
import checkUser from '../logic/checkUser'

export default function Profile(){

    const [newEmail, setNewEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [userId, setUserId] = useState(null)
    const [newEmailConfirm, setNewEmailConfirm] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
    const [emailModalVisible, setEmailModalVisible] = useState(false)
    const [passwordModalVisible, setPasswordModalVisible] = useState(false)
    const [hasActiveAlarms, setHasActiveAlarms] = useState(false) 
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log('Fetching session userId and token')
                const sessionUserId = await session.getSessionUserId()
                const token = await session.getSessionToken() 
    
                if (!token) {
                    console.error('No token found in session')
                    return
                }
    
                if (sessionUserId) {
                    setUserId(sessionUserId)
                    console.log('Retrieved userId from session:', sessionUserId)
    
            
                    console.log('Calling checkUser with userId and token:', sessionUserId, token)
                    const name = await checkUser(sessionUserId, token)
                    console.log('User name retrieved:', name)
                    setUserName(name)
    
                    console.log('Calling checkStatusAlarm with userId and token:', sessionUserId, token)
                    const alarmStatusChecked = await checkStatusAlarm(sessionUserId, token)
                    setHasActiveAlarms(alarmStatusChecked)
                    console.log('Alarm status checked:', alarmStatusChecked)
    
                } else {
                    console.error('No userId found in session')
                }
            } catch (error) {
                console.error('Error fetching user data:', error)
            } finally {
                setLoading(false)
            }
        }
    
        fetchUserData()
    }, [])

    const handleChangeEmail = async () => {
        if (!newEmail || !newEmailConfirm || !password) {
            alert('All fields are required for changing email')
            return
        }

        if (newEmail !== newEmailConfirm) {
            alert('Emails do not match')
            return
        }

        setLoading(true)

        try {
            const userId = await session.getSessionUserId()
            await changeEmail(userId, newEmail, newEmailConfirm, password)
            alert('Your email has been updated')
            // router.push('/Home')
        } catch (error) {
            alert('Error', error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleChangePassword = async () => {
        if (!newPassword || !newPasswordConfirm || !password) {
            alert('All fields are required for changing password')
            return
        }

        if (newPassword !== newPasswordConfirm) {
            alert('New passwords do not match')
            return
        }

        setLoading(true)

        try {
            const userId = await session.getSessionUserId()
            await changePassword(userId, newPassword, newPasswordConfirm, password)
            alert('Your password has been updated')
            // router.push('/Home')
        } catch (error) {
            alert('Error', error.message)
        } finally {
            setLoading(false)
        }
    }



    return (
        <View style={styles.container}>
            <BackgroundImage />

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

                <Link asChild href="/ShoppingList">
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

            <Text style={styles.welcomeText}>Options, {userName} </Text>


            <View style={styles.buttonContainer}>
                <ButtonSecondary label="CHANGE EMAIL" onPress={() => setEmailModalVisible(true)} />
                <ButtonSecondary label="CHANGE PASSWORD" onPress={() => setPasswordModalVisible(true)} />
            </View>

            {/* Modal para cambiar el email */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={emailModalVisible}
                onRequestClose={() => setEmailModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Change Email</Text>
                        <Input
                            placeholder="Enter new Email"
                            value={newEmail}
                            onChangeText={setNewEmail}
                            keyboardType="email-address"
                            placeholderTextColor="#4F4F4F"
                            width= "200"
                        />
                        <Input
                            placeholder="Confirm New Email"
                            value={newEmailConfirm}
                            onChangeText={setNewEmailConfirm}
                            keyboardType="email-address"
                            placeholderTextColor="#4F4F4F"
                             width= "200"
                        />
                        <Input
                            placeholder="Enter Current Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            placeholderTextColor="#4F4F4F"
                             width= "200"
                        />

                        <View style={styles.modalButtons} >
                        <ButtonSecondary label="Submit" onPress={handleChangeEmail}  />
                        <ButtonSecondary label="Close" onPress={() => setEmailModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal para cambiar la contraseña */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={passwordModalVisible}
                onRequestClose={() => setPasswordModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Change Password</Text>
                        <Input
                            placeholder="Enter New Password"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry={true}
                            placeholderTextColor="#4F4F4F"
                             width= "200"
                        />
                        <Input
                            placeholder="Confirm New Password"
                            value={newPasswordConfirm}
                            onChangeText={setNewPasswordConfirm}
                            secureTextEntry={true}
                            placeholderTextColor="#4F4F4F"
                             width= "200"
                        />
                        <Input
                            placeholder="Enter Current Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            placeholderTextColor="#4F4F4F"
                             width= "200"
                        />

                        <View style={styles.modalButtons} >
                        <ButtonSecondary label="Submit" onPress={handleChangePassword} />
                        <ButtonSecondary label="Close" onPress={() => setPasswordModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    rightIcons: {
        flexDirection: 'row', 
        justifyContent: 'flex-end',
        marginRight: 30, 
        alignItems: 'center',
        width: '100%',
        marginBottom: 40
    
    },
    iconButton: {
        marginHorizontal: 10, 
    },

    buttonChangeEmail: {
        paddingTop: 20
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        paddingTop: 20,
        paddingBottom: 10
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparente para el fondo del modal
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    modalButtons: {
        marginTop: 10,
      
    }
    
})

