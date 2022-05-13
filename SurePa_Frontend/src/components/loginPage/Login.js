import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { auth, fbLogin } from '../../services/DbCon';
import commonStyle from '../../commonStyle';
import { TextInput } from 'react-native-element-textinput';
import CommonButton from '../button';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('den1@a.com');
  const [pass, setPass] = useState('asd123');
  const [directMain, setDirectMain] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const resetAction = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'HomeStack' }
        ],
      })
    );
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      console.log("GİRİLİ");
      resetAction();
    } else {
      console.log("GİRİLİ DEGİL");
    }
  }, [directMain]);

  const loginClicked = () => {
    fbLogin(email, pass)
      .then((userCredential) => {
        setDirectMain(true);
      })
      .catch((error) => {
        const errorMessage = error.message;
        var errorCode = error.code;
        if (errorCode.includes('auth/wrong-password')) {
          setErrorMessage('Invalid password');
        } else {
          setErrorMessage('Email Not Found');
        }
      });

  }
  const registerClicked = () => {
    navigation.navigate('Signup')
  }

  return (
    <View style={commonStyle.mainDiv}>
      <View style={commonStyle.centeredContainer}>
        <Image
          style={commonStyle.applogo}
          source={require('../../../img/appIcon.png')}
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
          label="Email"
          placeholder='Email'
          placeholderTextColor="gray"
          focusColor="blue"
          onChangeText={text => {
            setEmail(text);
          }}
        />
      </View>
      <View style={commonStyle.container}>
        <TextInput
          value={pass}
          style={commonStyle.input}
          inputStyle={commonStyle.inputStyle}
          labelStyle={commonStyle.labelStyle}
          label="Password"
          placeholder='Password'
          placeholderTextColor="gray"
          focusColor="blue"
          secureTextEntry={true}
          onChangeText={changes => setPass(changes)}
          errorMessage={'asd'}
        />
      </View>
      <CommonButton text="Login" onPress={() => loginClicked()}
        customStyle={{
          button: {
            marginBottom: 10,
            marginTop: 10
          }
        }} />
      {errorMessage !== '' &&
        <Text>{errorMessage}</Text>}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
        <View>
          <Text style={{ width: 50, textAlign: 'center' }}>or</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
      </View>
      <CommonButton text="Register" onPress={() => registerClicked()}
        customStyle={{
          button: {
            marginTop: 10
          }
        }} />
    </View>
  )
};

export default Login;