import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
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
            <View style={commonStyle.container}>
                <TextInput
                    value={email}
                    style={commonStyle.input}
                    inputStyle={commonStyle.inputStyle}
                    labelStyle={commonStyle.labelStyle}
                    placeholderStyle={commonStyle.placeholderStyle}
                    textErrorStyle={commonStyle.textErrorStyle}
                    label="Email"
                    placeholder="Email"
                    placeholderTextColor="gray"
                    focusColor="blue"
                    onChangeText={text => {
                        setEmail(text);
                    }}
                />
            </View>
            <Button title="Ekle" onPress={() => onSubmit()}></Button>
            <Toast config={toastConfig} />
        </View>
    );

};

export default AddCareGiverPage;
