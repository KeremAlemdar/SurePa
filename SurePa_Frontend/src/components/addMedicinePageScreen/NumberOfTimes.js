import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import MultipleChoiceChecklist from '../multipleChoiceChecklist';

const NumberOfTimes = ({ route, navigation }) => {
    const [directPage, setDirectPage] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const { medicineName, birim } = route.params;


    useEffect(() => {
        if (directPage !== '') {
            navigation.navigate(directPage);
        }
    }, [directPage]);

    useEffect(() => {
        console.log(selectedOption);
    }, [selectedOption]);

    const forwardPage = () => {
        setDirectPage('Finalize');
    };
    const data = [
        {
            name: 'First Item',
            id: 1,
        },
        {
            name: 'Second Item',
            id: 2,
        },
        {
            name: 'Third Item',
            id: 3,
        },
    ];

    return (
        <View>
            <Text>NumberOfTimes</Text>
            <Text>{medicineName}</Text>
            <Text>{birim}</Text>
            <MultipleChoiceChecklist 
            data={data} 
            question="Bu ilacı ne sıklıkla alıyorsunuz?"
            selectedItem={selectedOption}
            setSelectedItem={setSelectedOption}>
            </MultipleChoiceChecklist>
            <Pressable style={styles.medicine_button} onPress={forwardPage}>
                <Text style={styles.medicine_button_text}>Next</Text>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    question: {
        fontSize: 18,
        fontWeight: 'bold',
    },
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
    },
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
export default NumberOfTimes;