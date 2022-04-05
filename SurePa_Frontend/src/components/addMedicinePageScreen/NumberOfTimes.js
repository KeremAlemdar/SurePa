import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import MultipleChoiceChecklist from '../multipleChoiceChecklist';

const NumberOfTimes = ({ medicineName, birim, selectedOption, setSelectedOption }) => {
    const [localSelectedOption, setLocalSelectedOption] = useState(selectedOption);

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
            <Text>{medicineName}</Text>
            <Text>{birim}</Text>
            <MultipleChoiceChecklist
                data={data}
                question="Bu ilacı ne sıklıkla alıyorsunuz?"
                selectedItem={localSelectedOption}
                setSelectedItem={option => {
                    setSelectedOption(option);
                    setLocalSelectedOption(option)
                }}>
            </MultipleChoiceChecklist>
        </View>
    );
};

export default NumberOfTimes;