import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, Redirect } from 'react-native';
import { fbLogin } from '../../services/SurePaServices';
import { Link, NativeRouter, Route, Routes } from "react-router-native";
import { auth } from '../../services/SurePaServices';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [directMain, setDirectMain] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect((async) => {
    const user = auth.currentUser;
    console.log(user);
    if (user) {
      console.log("GİRİLİ");
      navigation.navigate('Home')
    } else {
      console.log("GİRİLİ DEĞİL");
    }
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      console.log("GİRİLİ");
      navigation.navigate('Home')
    } else {
      console.log("GİRİLİ DEGİL");
    }
  }, [directMain]);

  const loginClicked = () => {
    fbLogin(email, pass)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        setDirectMain(true);
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage.includes('wrong-password')) {
          setErrorMessage('Password is Wrong');
        } else {
          setErrorMessage('Email Not Found');
        }
      });

  }
  const registerClicked = () => {
    navigation.navigate('Signup')
  }

  return (
    <View>
      <TextInput placeholder='Email' value={email} onChangeText={changes => setEmail(changes)} />
      <TextInput placeholder='Password' value={pass} secureTextEntry={true} onChangeText={changes => setPass(changes)} />
      <Button title='Login' onPress={() => loginClicked()} />
      {errorMessage !== '' &&
        <Text>{errorMessage}</Text>}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
        <View>
          <Text style={{ width: 50, textAlign: 'center' }}>or</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
      </View>
      <Button title='Register' onPress={() => registerClicked()} />
    </View>
  )
};

export default Login;