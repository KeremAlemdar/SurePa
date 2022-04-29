import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import commonStyle from '../../commonStyle';
import { TextInput } from 'react-native-element-textinput';

const Dose = ({ medicineName, type, doseCount, setDoseCount }) => {

    return (
        <View>
            <Text>{medicineName}</Text>
            <Text>{type}</Text>
            <TextInput
                value={doseCount}
                style={commonStyle.input}
                inputStyle={commonStyle.inputStyle}
                labelStyle={commonStyle.labelStyle}
                placeholderStyle={commonStyle.placeholderStyle}
                textErrorStyle={commonStyle.textErrorStyle}
                label={`Kutuda kaç ${type} var`}
                placeholder={`Kutuda kaç ${type} var`}
                placeholderTextColor="gray"
                focusColor="blue"
                onChangeText={text => {
                    setDoseCount(text);
                }}
            />
        </View>
    );
};

export default Dose;