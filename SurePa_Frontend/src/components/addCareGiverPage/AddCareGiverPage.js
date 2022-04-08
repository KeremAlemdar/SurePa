import React, { useState } from 'react';
import { View } from 'react-native';
import { sendInvitation } from '../../services/PatientController';
import { TextInput } from 'react-native-element-textinput';
import commonStyle from '../../commonStyle';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../toast';
import CommonButton from '../button';

const AddCareGiverPage = () => {
    const [email, setEmail] = useState('');

    const onSubmit = () => {
        sendInvitation(email).then(res => {
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
            <CommonButton text="Send Invitation" onPress={() => onSubmit()} />
            <Toast config={toastConfig} />
        </View>
    );

};

export default AddCareGiverPage;
