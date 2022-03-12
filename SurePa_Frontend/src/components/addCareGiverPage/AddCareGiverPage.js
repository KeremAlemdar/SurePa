import React, { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { addCaregiver } from '../../services/PatientController';
import { TextInput } from 'react-native-element-textinput';
import commonStyle from '../../commonStyle';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const AddCareGiverPage = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const toastConfig = {
        success: ({props}) => (
            <BaseToast
                text1={props.text1}
                style={{ borderLeftColor: 'green', marginTop: -20 }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={{
                    fontSize: 15,
                    fontWeight: '400'
                }}
            >
            </BaseToast>
        ),
        error: (props) => (
            <ErrorToast
                text1={props.text1}
                style={{ borderLeftColor: 'red', marginTop: -20 }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={{
                    fontSize: 17
                }}
                text2Style={{
                    fontSize: 15
                }}
            />
        ),
        tomatoToast: ({ text1, props }) => (
            <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
                <Text>{text1}</Text>
                <Text>{props.uuid}</Text>
            </View>
        )
    };

    const onSubmit = () => {
        console.log('asd');
        addCaregiver(email).then(res => {
            if (res === 'success') {
                Toast.show({
                    type: 'success',
                    // And I can pass any custom props I want
                    props: { text1: 'Invitation Send Successfully' },
                });
            } else {
                Toast.show({
                    type: 'error',
                    // And I can pass any custom props I want
                    props: { text1: res },
                });
            }
        });
    }

    return (
        <View style={commonStyle.mainDiv}>
            <View style={styles.container}>
                <TextInput
                    value={email}
                    style={styles.input}
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    placeholderStyle={styles.placeholderStyle}
                    textErrorStyle={styles.textErrorStyle}
                    label="TextInput"
                    placeholder="Placeholder"
                    placeholderTextColor="gray"
                    focusColor="blue"
                    onChangeText={text => {
                        setEmail(text);
                    }}
                />
            </View>
            <Button style={styles.submitButton} title="Ekle" onPress={() => onSubmit()}></Button>
            <Toast config={toastConfig} />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        height: 55,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#DDDDDD',
    },
    inputStyle: { fontSize: 16 },
    labelStyle: {
        fontSize: 14,
        position: 'absolute',
        top: -10,
        backgroundColor: 'white',
        paddingHorizontal: 4,
        marginLeft: -4,
    },
    placeholderStyle: { fontSize: 16 },
    textErrorStyle: { fontSize: 16 },
});

export default AddCareGiverPage;
