import { View, Text } from 'react-native';
import React from 'react';
import commonStyle from '../../commonStyle';
import { TextInput } from 'react-native-element-textinput';

const Dose = ({ type, doseCount, setDoseCount }) => {

    return (
        <View>
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