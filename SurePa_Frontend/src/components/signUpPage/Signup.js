import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { fbRegister } from '../../services/DbCon';
import commonStyle from '../../commonStyle';
import { TextInput } from 'react-native-element-textinput';
import { Picker } from '@react-native-picker/picker';
import CommonButton from '../button';


const styles = StyleSheet.create({
    appIcon: {
        width: 100,
        height: 100
    },

});

const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('patient');
    const [errorMessage, setErrorMessage] = useState('');

    const registerClicked = () => {
        console.log(status);
        fbRegister(email, pass, name, status)
            .then((userCredential) => {
                navigation.navigate('Login')
            })
            .catch((error) => {
                const errorMessage = error.message;
                if (errorMessage.includes('invalid-email')) {
                    setErrorMessage('Email is invalid');
                } else if (errorMessage.includes('Password should be at least 6 characters')) {
                    setErrorMessage('Password should be at least 6 characters');
                }
                else {
                    setErrorMessage('Error occured during signup');
                }
            });
    }
    const signInClicked = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={commonStyle.mainDiv}>
            <View style={commonStyle.centeredContainer}>
                <Image
                    style={styles.appIcon}
                    source={require('../../../img/appIcon.png')}
                />
            </View>
            <View style={commonStyle.container}>
                <TextInput
                    value={name}
                    style={commonStyle.input}
                    inputStyle={commonStyle.inputStyle}
                    labelStyle={commonStyle.labelStyle}
                    placeholderStyle={commonStyle.placeholderStyle}
                    textErrorStyle={commonStyle.textErrorStyle}
                    label="Full Name"
                    placeholder='Full Name'
                    placeholderTextColor="gray"
                    focusColor="blue"
                    onChangeText={changes => setName(changes)}
                />
            </View>
            <View style={commonStyle.container}>
                <TextInput
                    value={email}
                    style={commonStyle.input}
                    inputStyle={commonStyle.inputStyle}
                    labelStyle={commonStyle.labelStyle}
                    placeholderStyle={commonStyle.placeholderStyle}
                    textErrorStyle={commonStyle.textErrorStyle}
                    label="E-mail"
                    placeholder='Email'
                    placeholderTextColor="gray"
                    focusColor="blue"
                    onChangeText={changes => setEmail(changes)}
                />
            </View>
            <View style={commonStyle.container}>
                <TextInput
                    value={pass}
                    style={commonStyle.input}
                    inputStyle={commonStyle.inputStyle}
                    labelStyle={commonStyle.labelStyle}
                    placeholderStyle={commonStyle.placeholderStyle}
                    textErrorStyle={commonStyle.textErrorStyle}
                    label="Password"
                    placeholder='Password'
                    placeholderTextColor="gray"
                    focusColor="blue"
                    secureTextEntry={true}
                    onChangeText={changes => setPass(changes)}
                />
            </View>
            <View>
                <Picker
                    selectedValue={status}
                    onValueChange={(itemValue, itemIndex) =>
                        setStatus(itemValue)
                    }>
                    <Picker.Item label="Patient" value="patient" />
                    <Picker.Item label="Caregiver" value="caregiver" />
                </Picker>
            </View>
            {errorMessage !== '' &&
                <Text>{errorMessage}</Text>}
            <CommonButton text="Sign Up" onPress={() => registerClicked()}
                customStyle={{
                    button: {
                        marginTop: 2
                    }
                }} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                <View>
                    <Text style={{ width: 50, textAlign: 'center' }}>or</Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>
            <CommonButton text="Sign In" onPress={() => signInClicked()}
                customStyle={{
                    button: {
                        marginTop: 2
                    }
                }} />
        </View>
    )
};

export default SignUp;
