import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-element-textinput';
import commonStyle from '../../commonStyle';

const AddActivityPageScreen = () => {
    const [activityType, setActivityType] = useState('');
    const [activityDuration, setActivityDuration] = useState('');

    return (
        <View style={commonStyle.mainDiv}>
            <TextInput
                value={activityType}
                style={commonStyle.input}
                inputStyle={commonStyle.inputStyle}
                labelStyle={commonStyle.labelStyle}
                label="Activity Type"
                placeholder='Activity Type'
                placeholderTextColor="gray"
                focusColor="blue"
                onChangeText={changes => setActivityType(changes)}
                errorMessage={'asd'}
            />
            <TextInput
                value={activityDuration}
                style={commonStyle.input}
                inputStyle={commonStyle.inputStyle}
                labelStyle={commonStyle.labelStyle}
                label="Activity Duration"
                placeholder='Activity Duration'
                placeholderTextColor="gray"
                focusColor="blue"
                onChangeText={changes => setActivityDuration(changes)}
                errorMessage={'asd'}
            />
        </View>
    );
};

export default AddActivityPageScreen;