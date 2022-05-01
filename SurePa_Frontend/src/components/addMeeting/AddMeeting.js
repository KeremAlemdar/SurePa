import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import commonStyle from '../../commonStyle';
import DatePicker from 'react-native-date-picker'
import { TextInput } from 'react-native-element-textinput';
import CommonButton from '../button';
import Toast from 'react-native-toast-message';
import { addMeeting } from '../../services/PatientController';
import { toastConfig } from '../toast';
import * as AddCalendarEvent from 'react-native-add-calendar-event';

const AddMeeting = () => {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [details, setDetails] = useState('');
    const [title, setTitle] = useState('');
    const [openDate, setOpenDate] = useState(false);
    const [openTime, setOpenTime] = useState(false);

    const onSubmit = () => {
        addMeeting({
            title: title,
            date: date.toLocaleDateString(),
            time: time.toLocaleTimeString(),
            details: details
        }).then(res => {
            if (res === 'success') {
                
                const newDate = date.getUTCFullYear() + "-" + date.getUTCMonth() + "-" + 
                date.getUTCDate() + "T" + time.getUTCHours() + ":" + 
                time.getUTCMinutes() + ":" + 
                time.getUTCSeconds() + "." +
                time.getUTCMilliseconds() + "Z";
                const eventConfig = {
                    title,
                    startDate: newDate,
                    notes: details,
                };
                AddCalendarEvent.presentEventCreatingDialog(eventConfig);
                Toast.show({
                    type: 'success',
                    // And I can pass any custom props I want
                    props: { text1: 'Meeting Added Successfully' },
                });
            } else {
                Toast.show({
                    type: 'error',
                    // And I can pass any custom props I want
                    props: { text1: res },
                });
            }
        });
    };

    return (
        <View style={[commonStyle.mainDiv, { justifyContent: 'space-between' }]}>
            <View>
                <TextInput
                    value={title}
                    style={commonStyle.input}
                    inputStyle={commonStyle.inputStyle}
                    labelStyle={commonStyle.labelStyle}
                    label="Title"
                    placeholder='Title'
                    placeholderTextColor="gray"
                    focusColor="blue"
                    onChangeText={changes => setTitle(changes)}
                    errorMessage={'asd'}
                />
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
                <TextInput
                    value={details}
                    style={commonStyle.input}
                    inputStyle={commonStyle.inputStyle}
                    labelStyle={commonStyle.labelStyle}
                    label="Details"
                    placeholder='Details'
                    placeholderTextColor="gray"
                    focusColor="blue"
                    onChangeText={changes => setDetails(changes)}
                    errorMessage={'asd'}
                />
            </View>
            <CommonButton text={'Add'} onPress={() => onSubmit()} />
            <Toast config={toastConfig} />
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
    }
});

export default AddMeeting;