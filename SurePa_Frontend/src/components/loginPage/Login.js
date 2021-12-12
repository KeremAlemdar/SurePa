import React, { useEffect, useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { fbLogin } from '../../services/SurePaServices';
import { Link, NativeRouter, Route, Routes } from "react-router-native";

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [directMain, setDirectMain] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = 

  useEffect(() => {
    if (directMain) {
      setDirectMain(false);
    }
  }, [directMain]);

  const loginClicked = () => {
    fbLogin(email, pass)
      .then((userCredential) => {
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

  return (
    <View>
      <TextInput placeholder='Email' value={email} onChangeText={changes => setEmail(changes)} />
      <TextInput placeholder='Password' value={pass} secureTextEntry={true} onChangeText={changes => setPass(changes)} />
      <Button title='Login' onPress={() => loginClicked} />
    </View>
  )
};

export default Login;