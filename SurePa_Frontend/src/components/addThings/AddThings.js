import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import commonStyle from '../../commonStyle';

const AddCareGiverPage = ({ navigation }) => {
    const [directPage, setDirectPage] = useState('');

    useEffect(() => {
        if (directPage !== '') {
            navigation.navigate(directPage);
        }
    }, [directPage]);

    return (
        <View style={commonStyle.mainDiv}>
            <View style={commonStyle.container}>
                <Button title="Add medicine" onPress={() => setDirectPage('AddMedicinePage')}></Button>
            </View>
            <View style={commonStyle.container}>
                <Button title="Add Caregiver" onPress={() => setDirectPage('AddCareGiverPage')}></Button>
            </View>
            <View style={commonStyle.container}>
                <Button title="Add randevu" onPress={() => onSubmit()}></Button>
            </View>
            <View style={commonStyle.container}>
                <Button title="Add contact" onPress={() => onSubmit()}></Button>
            </View>
        </View>
    );

};

export default AddCareGiverPage;
