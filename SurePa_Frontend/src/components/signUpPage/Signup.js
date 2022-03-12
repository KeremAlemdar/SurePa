import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { fbRegister } from '../../services/DbCon';
import commonStyle from '../../commonStyle';
import { TextInput } from 'react-native-element-textinput';

const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const registerClicked = () => {
        fbRegister(email, pass, name)
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
            <View style={commonStyle.container}>
                <TextInput
                    value={name}
                    style={commonStyle.input}
                    inputStyle={commonStyle.inputStyle}
                    labelStyle={commonStyle.labelStyle}
                    placeholderStyle={commonStyle.placeholderStyle}
                    textErrorStyle={commonStyle.textErrorStyle}
                    label="TextInput"
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
                    label="TextInput"
                    placeholder='Email'
                    placeholderTextColor="gray"
                    focusColor="blue"
                    secureTextEntry={true}
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
                    label="TextInput"
                    placeholder='Password'
                    placeholderTextColor="gray"
                    focusColor="blue"
                    secureTextEntry={true}
                    onChangeText={changes => setPass(changes)}
                />
            </View>
            {errorMessage !== '' &&
                <Text>{errorMessage}</Text>}
            <Button title='Signup' onPress={() => registerClicked()} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                <View>
                    <Text style={{ width: 50, textAlign: 'center' }}>or</Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>
            <Button title='SignIn' onPress={() => signInClicked()} />
        </View>
    )
};

export default SignUp;
