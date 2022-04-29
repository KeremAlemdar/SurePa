import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import commonStyle from '../../commonStyle';

const NumberOfTimes = ({ medicineName, birim, doseCount, setDoseCount }) => {

    return (
        <View>
            <Text>{medicineName}</Text>
            <Text>{birim}</Text>
            <TextInput
                value={doseCount}
                style={commonStyle.input}
                inputStyle={commonStyle.inputStyle}
                labelStyle={commonStyle.labelStyle}
                placeholderStyle={commonStyle.placeholderStyle}
                textErrorStyle={commonStyle.textErrorStyle}
                label={`Kutuda kaç ${birim} var`}
                placeholder={`Kutuda kaç ${birim} var`}
                placeholderTextColor="gray"
                focusColor="blue"
                onChangeText={text => {
                    setDoseCount(text);
                }}
            />
        </View>
    );
};

export default NumberOfTimes;