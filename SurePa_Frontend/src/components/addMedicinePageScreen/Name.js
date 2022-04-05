import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-element-textinput';
import commonStyle from '../../commonStyle';


const Name = ({ navigation }) => {
    const [directPage, setDirectPage] = useState('');
    const [medicineName, setMedicineName] = useState('');

    useEffect(() => {
        if (directPage !== '') {
            navigation.navigate(directPage, {
                medicineName: medicineName,
            });
        }
    }, [directPage]);

    const forwardPage = () => {
        setDirectPage('Type');
    };

    return (
        <View style={styles.name}>
            <View>
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
            </View>
            <Pressable style={styles.medicine_button} onPress={forwardPage}>
                <Text style={styles.medicine_button_text}>Next</Text>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    name: {
        marginTop: 30,
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
    }
});
export default Name;