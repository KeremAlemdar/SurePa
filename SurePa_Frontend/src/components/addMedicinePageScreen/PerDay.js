import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';

const PerDay = ({ type, perDay, setPerDay, medicineName, doseCount, setStartDate, setEndDate }) => {
    const [localPerDay, setLocalPerDay] = useState(perDay);
    const [openDate, setOpenDate] = useState(false);
    const [openDateEnd, setOpenDateEnd] = useState(false);
    const [date, setDate] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.headerText}>{medicineName}</Text>
                <Text>{type}</Text>
                <Text>{doseCount}</Text>
            </View>
            <View style={styles.divider}>

            </View>
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
                <Text style={styles.text1} onPress={() => setOpenDate(true)}>{date.toLocaleDateString()}</Text>
                <DatePicker
                    modal
                    open={openDate}
                    date={date}
                    mode="date"
                    onConfirm={(date) => {
                        setOpenDate(false)
                        setDate(date)
                        setStartDate(date)
                    }}
                    onCancel={() => {
                        setOpenDate(false)
                    }}
                />
            </View>
            <View style={styles.asd}>
                <Text style={styles.text}>End Time: </Text>
                <Text style={styles.text1} onPress={() => setOpenDateEnd(true)}>{dateEnd.toLocaleDateString()}</Text>
                <DatePicker
                    modal
                    open={openDateEnd}
                    date={dateEnd}
                    mode="date"
                    onConfirm={(date) => {
                        setOpenDateEnd(false)
                        setDateEnd(date)
                        setEndDate(date)
                    }}
                    onCancel={() => {
                        setOpenDateEnd(false)
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