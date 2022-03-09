import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { fbRegister } from '../../services/DbCon';

const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const registerClicked = () => {
        fbRegister(email, pass)
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
        <View>
            <TextInput placeholder='Email' value={email} onChangeText={changes => setEmail(changes)} />
            <TextInput placeholder='Password' value={pass} secureTextEntry={true} onChangeText={changes => setPass(changes)} />
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
