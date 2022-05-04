import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import commonStyle from '../../commonStyle';
import { TextInput } from 'react-native-element-textinput';

const Times = ({ perDay, setTimes }) => {
    const [inputs, setInputs] = useState([]);
    const [localTimes, setLocalTimes] = useState([]);

    useEffect(() => {
        setTimes(localTimes);
    }, [localTimes]);

    useEffect(() => {
        const asd = [];
        for (let i = 0; i < perDay; i++) {
            asd.push(
                <TextInput
                    value={localTimes[i]}
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
                        setLocalTimes(prev => {
                            const newArray = [...prev];
                            newArray[i] = text;
                            return newArray;
                        });
                    }}
                />
            );
        }
        setInputs(asd);
    }, []);

    return (
        <View>
            {
                inputs.map((input, index) => {
                    return (
                        <View key={index}>
                            {input}
                        </View>
                    );
                })
            }
        </View>
    );

};

export default Times;