import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import commonStyle from '../../commonStyle';
import { TextInput } from 'react-native-element-textinput';

const Times = ({ birim, perDay, setTimes, times, medicineName, doseCount }) => {

    const createFields = numberOfField => {
        let content = [];
        for (let i = 0; i < numberOfField; i++) {
            const item = animals[i];
            content.push(<li key={i}><TextInput
                value={times[0]}
                style={commonStyle.input}
                inputStyle={commonStyle.inputStyle}
                labelStyle={commonStyle.labelStyle}
                placeholderStyle={commonStyle.placeholderStyle}
                textErrorStyle={commonStyle.textErrorStyle}
                label={`Saat gir, örnek 15:00`}
                placeholder={`Saat gir, örnek 15:00`}
                placeholderTextColor="gray"
                focusColor="blue"
                onChangeText={text => {
                    setDoseCount(text);
                }}
            /></li>);
        }
        return content;
    };

    return (
        <View>
            {createFields}
        </View>
    );

};

export default Times;