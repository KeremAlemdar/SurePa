import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';

const Finalize = ({ navigation }) => {
    const [directPage, setDirectPage] = useState('');
    
    useEffect(() => {
        if (directPage !== '') {
            navigation.navigate(directPage);
        }
    }, [directPage]);

    const forwardPage = () => {
        setDirectPage('MedicinesPage');
    };

    return (
        <View>
            <Text>Finalize</Text>
            <Pressable style={styles.medicine_button} onPress={forwardPage}>
                <Text style={styles.medicine_button_text}>Finalize</Text>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    medicine_button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 1,
        borderRadius: 10,
        backgroundColor: '#24263a',
    },
    medicine_button_text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }
});
export default Finalize;