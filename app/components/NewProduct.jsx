// import React, { useState } from 'react'
// import { View, Text, StyleSheet, Dimensions, Platform, Button } from 'react-native'
// import { useRouter } from 'expo-router'
// import { Picker } from '@react-native-picker/picker'
// import DateTimePicker from '@react-native-community/datetimepicker'
// import IconMojis from '../library/IconMojis.jsx'

// import logic from '../logic'

// import { BackgroundImage } from './background'
// import { ButtonSecondary } from './buttons'
// import { Input } from './input'

// const { width } = Dimensions.get('window')

// export default function NewProduct({ drawerId, onAddProduct }) {

//     const [nameProduct, setNameProduct] = useState('')
//     const [category, setCategory] = useState('')
//     const [selectedEmoji, setSelectedEmoji] = useState('')
//     const [quantity, setQuantity] = useState('')
//     const [expirationDate, setExpirationDate] = useState(new Date()) // Default to today
//     const [showDatePicker, setShowDatePicker] = useState(false)

//     const handleAddProduct = async () => {
//         console.log('category:', typeof category, category)
//         try {
//             await logic.addProduct(nameProduct, category, quantity, expirationDate, drawerId, selectedEmoji)
//             console.log('Product added successfully')
//             onAddProduct()
//             alert('Success', 'Product added successfully!')

//         } catch (error) {
//             console.error('Error adding product:', error)
//             alert('Error', 'There was an error adding the product')
//         }
//     }

//     const handleDateChange = (event, selectedDate) => {
//         const currentDate = selectedDate || expirationDate
//         setShowDatePicker(Platform.OS === 'ios') // For iOS, keep the picker open after selection
//         setExpirationDate(currentDate)
//     }

//     return (
//         <View style={styles.container}>
//             <BackgroundImage />
//             <View style={styles.productContainer}>
//                 <Input
//                     placeholder="Enter Product Name"
//                     value={nameProduct}
//                     onChangeText={setNameProduct}
//                     keyboardType="default"
//                 />

//                 <Text style={styles.label}>Category</Text>
//                 <Picker
//                     selectedValue={category}
//                     style={styles.picker}
//                     onValueChange={(itemValue) => setCategory(itemValue)}
//                 >
//                     <Picker.Item label="Select a category..." value="" />
//                     <Picker.Item label="Vegetables" value="vegetables" />
//                     <Picker.Item label="Fruits" value="fruits" />
//                     <Picker.Item label="Meat" value="meat" />
//                     <Picker.Item label="Fish" value="fish" />
//                     <Picker.Item label="Dairy" value="dairy" />
//                     {/* Añade más categorías aquí */}
//                 </Picker>

//                 <Input
//                     placeholder="Enter Product Quantity"
//                     value={quantity}
//                     onChangeText={setQuantity}
//                     keyboardType="default"
//                 />

//                 <Text style={styles.label}>Expiration Date</Text>
//                 <Button title="Select Expiration Date" onPress={() => setShowDatePicker(true)} />
//                 {showDatePicker && (
//                     <DateTimePicker
//                         value={expirationDate}
//                         mode="date"
//                         display="default"
//                         onChange={handleDateChange}
//                     />
//                 )}
//                 <Text style={styles.selectedDate}>
//                     {expirationDate.toDateString()}
//                 </Text>

//                 <Text style={styles.label}>Choose an Emoji</Text>
//                 <IconMojis onSelect={setSelectedEmoji} />

//                 {selectedEmoji && (
//                     <Text style={styles.selectedEmoji}>
//                         Selected Emoji: {selectedEmoji}
//                     </Text>
//                 )}

//                 <ButtonSecondary
//                     label="ADD PRODUCT"
//                     onPress={handleAddProduct}
//                 />
//             </View>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     productContainer: {
//         width: width * 0.9,
//         padding: 20,
//         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//         borderRadius: 10,
//     },
//     label: {
//         marginTop: 20,
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     picker: {
//         height: 50,
//         width: '100%',
//     },
//     selectedDate: {
//         marginTop: 10,
//         fontSize: 16,
//         color: '#555',
//     },
//     selectedEmoji: {
//         marginTop: 10,
//         fontSize: 18,
//     },
// })


/////////////////////////////

import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import IconMojis from '../library/IconMojis.jsx';

import logic from '../logic';

import { BackgroundImage } from './background';
import { ButtonSecondary } from './buttons';
import { Input } from './input';

const { width } = Dimensions.get('window');

export default function NewProduct({ drawerId, onAddProduct }) {
    const [nameProduct, setNameProduct] = useState('');
    const [category, setCategory] = useState('');
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const [quantity, setQuantity] = useState('');
    const [expirationDate, setExpirationDate] = useState(new Date()); // Default to today
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleAddProduct = async () => {
        console.log('category:', typeof category, category);
        try {
            await logic.addProduct(nameProduct, category, quantity, expirationDate, drawerId, selectedEmoji);
            console.log('Product added successfully');
            onAddProduct();
            alert('Success', 'Product added successfully!');
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Error', 'There was an error adding the product');
        }
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || expirationDate;
        setShowDatePicker(Platform.OS === 'ios'); // For iOS, keep the picker open after selection
        setExpirationDate(currentDate);
    };

    return (
        <View style={styles.container}>
            <BackgroundImage />
            <View style={styles.productContainer}>
                <Input
                    placeholder="Enter Product Name"
                    value={nameProduct}
                    onChangeText={setNameProduct}
                    keyboardType="default"
                />

                <Text style={styles.label}>Category</Text>
                <Picker
                    selectedValue={category}
                    style={styles.picker}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                >
                    <Picker.Item label="Select a category..." value="" />
                    <Picker.Item label="Vegetables" value="vegetables" />
                    <Picker.Item label="Fruits" value="fruits" />
                    <Picker.Item label="Meat" value="meat" />
                    <Picker.Item label="Fish" value="fish" />
                    <Picker.Item label="Dairy" value="dairy" />
                    {/* Añade más categorías aquí */}
                </Picker>

                <Input
                    placeholder="Enter Product Quantity"
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="default"
                />

                <Text style={styles.label}>Expiration Date</Text>
                <Button title="Select Expiration Date" onPress={() => setShowDatePicker(true)} />
                {showDatePicker && (
                    <DateTimePicker
                        value={expirationDate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
                <Text style={styles.selectedDate}>
                    {expirationDate.toDateString()}
                </Text>

                <Text style={styles.label}>Choose an Emoji</Text>
                <IconMojis onSelect={setSelectedEmoji} />

                {selectedEmoji && (
                    <Text style={styles.selectedEmoji}>
                        Selected Emoji: {selectedEmoji}
                    </Text>
                )}

                <ButtonSecondary
                    label="ADD PRODUCT"
                    onPress={handleAddProduct}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productContainer: {
        width: width * 0.9,
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
    },
    label: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    selectedDate: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    selectedEmoji: {
        marginTop: 10,
        fontSize: 18,
    },
});
