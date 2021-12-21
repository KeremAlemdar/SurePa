import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { auth } from '../../services/SurePaServices';
import { fbRegister } from '../../services/SurePaServices';
const Main = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
    }, []);
    const registerClicked = () => {
        fbRegister(email, pass)
            .then((userCredential) => {
                navigation.navigate('Login')
            })
            .catch((error) => {
                console.log(error);
                const errorMessage = error.message;
                console.log(errorMessage);
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
            <Button title='SignIn' onPress={() => signInClicked()} />
        </View>
    )
};

export default Main;