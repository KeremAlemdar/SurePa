import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';

const Type = ({ type, setType }) => {
    const [localBirim, setLocalBirim] = useState(type);
    return (
        <View>
            <View>
                <Picker
                    selectedValue={localBirim}
                    onValueChange={(itemValue, itemIndex) => {
                        setType(itemValue); setLocalBirim(itemValue);
                    }
                    }>
                    <Picker.Item label="Please Chose" value="Please Chose" />
                    <Picker.Item label="Mililitre" value="Mililitre" />
                    <Picker.Item label="Damla" value="Damla" />
                    <Picker.Item label="Kapsül" value="Kapsül" />
                    <Picker.Item label="Type" value="Type" />
                    <Picker.Item label="Paket" value="Paket" />
                    <Picker.Item label="Ampul" value="Ampul" />
                    <Picker.Item label="Nefes" value="Nefes" />
                    <Picker.Item label="Sprey" value="Sprey" />
                    <Picker.Item label="Çay Kaşığı" value="Çay Kaşığı" />
                    <Picker.Item label="Çorba Kaşığı" value="Çorba Kaşığı" />
                    <Picker.Item label="Hap" value="Hap" />
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
export default Type;