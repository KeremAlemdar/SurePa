import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { addCaregiver } from '../../services/PatientController';

const AddCareGiverPage = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const onSubmit = () => {
        console.log('asd');
        addCaregiver('b@b.com');
    }

    return (
        <View>
            <View style={styles.mainView}>
                <TextInput
                    onChangeText={setEmail}
                    value={email}
                    style={styles.input}
                    placeholder="Enter the Email of CareGiver"
                    keyboardType="email-address"
                ></TextInput>
                <Button style={styles.submitButton} title="Ekle" onPress={() => onSubmit()}></Button>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    input: {
      borderWidth: 0.5,
      borderRadius: 5,
      //borderColor: '#d6d7da',
      padding: 10,
      marginTop:10,
    },
    mainView:{
        margin: 10,
    },
    submitButton: {
        marginTop:10,
        color: '#d6d7da',
    }
  });

export default AddCareGiverPage;
