import React, { useState } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { TextInput } from 'react-native-element-textinput';
import commonStyle from '../../commonStyle';
import { addBloodSugar } from '../../services/PatientController';
import CommonButton from '../button';


const AddBloodSugar = () => {
    const [bloodSugar, setBloodSugar] = useState('');
    const [hungry, setHungry] = useState(false);
    const [date, setDate] = useState(new Date());
    const [openDate, setOpenDate] = useState(false);
    const [formatedDate, setFormatedDate] = useState('');

    const finalize = () => {
        addBloodSugar({bloodSugar: bloodSugar, hungry: hungry, date: formatedDate});
    };
    const toggleSwitch = (value) => {
        setHungry(value);
    };
    return (
        <View style={commonStyle.mainDiv}>
            <TextInput
                value={bloodSugar}
                style={commonStyle.input}
                inputStyle={commonStyle.inputStyle}
                labelStyle={commonStyle.labelStyle}
                label="Blood Sugar"
                placeholder='Blood Sugar'
                placeholderTextColor="gray"
                focusColor="blue"
                onChangeText={changes => setBloodSugar(changes)}
                errorMessage={'asd'}
            />
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Switch
                    style={{ marginTop: 20 }}
                    onValueChange={toggleSwitch}
                    value={hungry}
                />
                <Text style={styles.text}>
                    {hungry ? 'Hungry' : 'Satiated'}
                </Text>

            </View>
            <View style={styles.dateline}>
                <Text style={styles.text}>Date: </Text>
                <Text style={styles.text1} onPress={() => setOpenDate(true)}>{date.toLocaleString()}</Text>
                <DatePicker
                    modal
                    open={openDate}
                    date={date}
                    onConfirm={(res) => {
                        setOpenDate(false)
                        const dateFormatted = res.getDay() + '-' + res.getMonth() + '-' + 
                        res.getFullYear() + ' ' + res.getHours() + ':' + res.getMinutes() + ':' + res.getSeconds();
                        setDate(res)
                        setFormatedDate(dateFormatted)
                    }}
                    onCancel={() => {
                        setOpenDate(false)
                    }}
                />
            </View>
            <CommonButton text='Add' onPress={finalize}></CommonButton>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 22,
        fontWeight: '600',
        marginTop: 16,
    },
    text1: {
        fontSize: 22,
        fontWeight: '600',
        marginTop: 16,
        color: '#00BFFF',
    },
    dateline: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

});

export default AddBloodSugar;