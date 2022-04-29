import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';

const PerDay = ({ type, perDay, setPerDay, medicineName, doseCount}) => {
    const [localPerDay, setLocalPerDay] = useState(perDay);

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.headerText}>{medicineName}</Text>
                <Text>{type}</Text>
                <Text>{doseCount}</Text>
            </View>
            <View style={styles.divider}>

            </View>
            <View>
                <Picker
                    selectedValue={localPerDay}
                    onValueChange={(itemValue, itemIndex) => {
                        setPerDay(itemValue); setLocalPerDay(itemValue);
                    }
                    }>
                    <Picker.Item label="Please Chose" value="Please Chose" />
                    <Picker.Item label="Günde bir kez" value="1" />
                    <Picker.Item label="Günde iki kez" value="2" />
                    <Picker.Item label="Günde üc kez" value="3" />
                </Picker>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: 'black',
    },
    header: {
        display: 'flex',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 30,
        borderStyle: 'solid',
    },
    headerText: {
        fontSize: 30,
        color: 'black',
    }
});
export default PerDay;