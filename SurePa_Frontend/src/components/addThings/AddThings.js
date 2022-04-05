import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import commonStyle from '../../commonStyle';
import CommonButton from '../button';

const AddThings = ({ navigation }) => {
    const [directPage, setDirectPage] = useState('');

    useEffect(() => {
        if (directPage !== '') {
            navigation.navigate(directPage);
        }
    }, [directPage]);

    return (
        <View style={commonStyle.mainDiv}>
            <CommonButton text="Add Caregiver" onPress={() => setDirectPage('AddCareGiverPage')} />
            <CommonButton text="Add randevu" onPress={() => onSubmit()} />
            <CommonButton text="Add contact" onPress={() => onSubmit()} />
        </View>
    );

};

export default AddThings;
