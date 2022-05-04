import React, { useState } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { TextInput } from 'react-native-element-textinput';
import commonStyle from '../../commonStyle';
import { auth } from '../../services/DbCon';
import { addBloodSugar } from '../../services/PatientController';
import CommonButton from '../button';


const AddBloodSugar = () => {
    const [bloodSugar, setBloodSugar] = useState('');
    const [hungry, setHungry] = useState(false);
    const [hungry2, setHungry2] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [openDate, setOpenDate] = useState(false);
    const [openTime, setOpenTime] = useState(false);

    const finalize = () => {
        addBloodSugar({bloodSugar: bloodSugar, hungry: hungry, date: date, time: time});
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
                <Text style={styles.text1} onPress={() => setOpenDate(true)}>{date.toLocaleDateString()}</Text>
                <DatePicker
                    modal
                    open={openDate}
                    date={date}
                    mode="date"
                    onConfirm={(date) => {
                        setOpenDate(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setOpenDate(false)
                    }}
                />
            </View>
            <View style={[styles.dateline, { marginBottom: 14 }]}>
                <Text style={styles.text}>Time: </Text>
                <Text style={styles.text1} onPress={() => setOpenTime(true)}>{time.toLocaleTimeString()}</Text>
                <DatePicker
                    modal
                    open={openTime}
                    date={time}
                    mode="time"
                    onConfirm={(date) => {
                        setOpenTime(false)
                        setTime(date)
                    }}
                    onCancel={() => {
                        setOpenTime(false)
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