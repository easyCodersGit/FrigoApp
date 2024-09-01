
import React, {useState} from 'react'
import { View, Text, ImageBackground, StyleSheet, Dimensions, Platform, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import CustomAlert from '../library/CustomAlert'
import { ButtonBlue } from './buttons'
import deleteFridge from '../logic/deleteFridge'

const { width } = Dimensions.get('window')

function Alarm(props) {
    const { alarm, onAlarmDeleted } = props
    const [alertVisible, setAlertVisible] = useState(false)

    const router = useRouter()

    const handleDeleteAlarm = async () => {

        console.log('Handle Delete pulsado')
        // try {
        //     //const alarmName = await deleteAlarm(alarm.id, user)
        //     setAlertVisible(false)
        //     onAlarmDeleted() 
        // } catch (error) {
        //     console.error('Error deleting alarm:', error)
        // }
    }

    return (

        <>
      
        <Pressable
                style={[
                    styles.alarmContainer,
                    alarm.isActive && { backgroundColor: '#ff6347' } 
                ]}
            >
            <View style={styles.detailsOverlay}>
              
                <Text style={styles.alarmProduct}>Product: {alarm.product?.name || 'Unknown'}</Text>
                <Text style={styles.alarmDetails}>
                        Current Quantity: {alarm.product?.quantity || 'Unknown'}
                    </Text>
                <Text style={styles.alarmDetails}>
                    {alarm.type === 'quantity'
                        ? `Minimum Quantity: ${alarm.minimumQuantity}`
                        : `Days Before Expiration: ${alarm.daysBeforeExpiration}`}
                </Text>
                <Text style={styles.alarmDetails}>
                    Is active?: {alarm.isActive ? 'Yes' : 'No'}
                </Text>
            </View>
            <View style={styles.deleteButtonContainer}>
                <ButtonBlue
                    label="Delete"
                    onPress={() => setAlertVisible(true)}
                />
            </View>
        </Pressable>

        <CustomAlert
            visible={alertVisible}
            title="Delete Alarm"
            message={`Are you sure you want to delete this alarm?`}
            onConfirm={handleDeleteAlarm}
            onCancel={() => setAlertVisible(false)}
        />
    </>


    )
}


const styles = StyleSheet.create({
    alarmContainer: {
        flex: 1,
        margin: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f5f5f5',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    detailsOverlay: {
        marginBottom: 10,
    },
    alarmType: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    alarmProduct: {
        fontSize: 16,
        fontWeight: 'bold',
       
    },
    alarmDetails: {
        fontSize: 14,
        color: '#333',
    },
    deleteButtonContainer: {
        alignItems: 'flex-end',
    },
})

export default Alarm