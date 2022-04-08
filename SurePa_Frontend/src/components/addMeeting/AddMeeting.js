import React from 'react';
import { View } from 'react-native';
import commonStyle from '../../commonStyle';
import DatePicker from 'react-native-date-picker'

const AddMeeting = () => {
    return (
        <View style={commonStyle.mainDiv}>
            <DatePicker 
                mode='datetime'
            />
        </View>
    );
};

export default AddMeeting;