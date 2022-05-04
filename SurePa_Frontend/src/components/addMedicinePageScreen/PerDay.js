import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';

const PerDay = ({ perDay, setPerDay, setStartDate, setEndDate, startDate, endDate }) => {
    const [localPerDay, setLocalPerDay] = useState(perDay);
    const [startDateOpen, setStartDateOpen] = useState(false);
    const [endDateOpen, setEndDateOpen] = useState(false);
    const [localStartDate, setLocalStartDate] = useState(startDate);
    const [localEndDate, setLocalEndDate] = useState(endDate);

    return (
        <View>
            <View>
                <Picker
                    selectedValue={localPerDay}
                    onValueChange={(itemValue, itemIndex) => {
                        setPerDay(itemValue); setLocalPerDay(itemValue);
                    }
                    }>
                    <Picker.Item label="Please Chose" value="Please Chose" />
                    <Picker.Item label="Günde bir kez" value="1" />
                    <Picker.Item label="Günde iki kez" value="2" />
                    <Picker.Item label="Günde üc kez" value="3" />
                </Picker>
            </View>
            <View style={styles.asd}>
                <Text style={styles.text}>Start Time: </Text>
                <Text style={styles.text1} onPress={() => setStartDateOpen(true)}>{localStartDate.toLocaleDateString()}</Text>
                <DatePicker
                    modal
                    open={startDateOpen}
                    date={localStartDate}
                    mode="date"
                    onConfirm={(wer) => {
                        setStartDateOpen(false);
                        setStartDate(wer);
                        setLocalStartDate(wer);
                    }}
                    onCancel={() => {
                        setStartDateOpen(false);
                    }}
                />
            </View>
            <View style={styles.asd}>
                <Text style={styles.text}>End Time: </Text>
                <Text style={styles.text1} onPress={() => setEndDateOpen(true)}>{localEndDate.toLocaleDateString()}</Text>
                <DatePicker
                    modal
                    open={endDateOpen}
                    date={localEndDate}
                    mode="date"
                    onConfirm={(wer) => {
                        setEndDateOpen(false);
                        setEndDate(wer);
                        setLocalEndDate(wer);
                    }}
                    onCancel={() => {
                        setEndDateOpen(false);
                    }}
                />
            </View>
        </View>
    );
}

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
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: 'black',
    },
    header: {
        display: 'flex',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 30,
        borderStyle: 'solid',
    },
    headerText: {
        fontSize: 30,
        color: 'black',
    },
    asd: {
        display: 'flex',
        flexDirection: 'row',
    }
});
export default PerDay;