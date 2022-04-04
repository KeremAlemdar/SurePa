import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { auth, fbLogin } from '../../services/DbCon';
import commonStyle from '../../commonStyle';
import { TextInput } from 'react-native-element-textinput';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [pass, setPass] = useState('');
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