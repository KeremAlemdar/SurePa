import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { fbLogin } from '../../services/SurePaServices';
import { auth } from '../../services/SurePaServices';
import { CommonActions } from '@react-navigation/native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [directMain, setDirectMain] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const resetAction = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'HomePage'}
        ],
      })
    );
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      console.log("GİRİLİ");
      // navigation.navigate('HomePage');
      resetAction();
    } else {
      console.log("GİRİLİ DEGİL");
    }
  }, [directMain]);

  const loginClicked = () => {
    fbLogin(email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
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