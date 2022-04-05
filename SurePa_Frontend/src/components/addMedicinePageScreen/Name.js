import React, { useState } from 'react';
import { TextInput } from 'react-native-element-textinput';
import commonStyle from '../../commonStyle';

const Name = ({
        medicineName,
        setMedicineName,
    }) => {

    return (
        <TextInput
            value={medicineName}
            style={commonStyle.input}
            inputStyle={commonStyle.inputStyle}
            labelStyle={commonStyle.labelStyle}
            placeholderStyle={commonStyle.placeholderStyle}
            textErrorStyle={commonStyle.textErrorStyle}
            label="İlaç İsmi"
            placeholder='Buraya isim girin'
            placeholderTextColor="gray"
            focusColor="blue"
            onChangeText={text => {
                setMedicineName(text);
            }}
        />
    );
}

export default Name;