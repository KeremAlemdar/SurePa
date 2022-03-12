import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import commonStyle from '../../commonStyle';
import { getCaregivers, deleteCaregiver } from '../../services/PatientController';
import List from '../list/List';

const ProfilePage = ({ navigation }) => {
    const [directPage, setDirectPage] = useState('');
    const [caregivers, setCaregivers] = useState([]);

    useEffect(() => {
        if (directPage !== '') {
            navigation.navigate(directPage);
        }
    }, [directPage]);

    useEffect(() => {
        getCaregivers().then(res => {
            setCaregivers(res);
        });
    }, []);

    const denyCaregiver = (caregiver) => {
        deleteCaregiver(caregiver).then(res => {
        });
    };

    return (
        <View style={commonStyle.mainDiv}>
            <View style={commonStyle.container}>
                <Button title="See Invitations" onPress={() => setDirectPage('InvitationsPage')}></Button>
                <List data={caregivers} deny={denyCaregiver}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    medicineList: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 5,
        marginTop: 25
    },
    singleMedicineRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'black',
        marginRight: '5%',
        marginLeft: '5%',
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        paddingRight: 5,
        paddingLeft: 5,
    },
    text: {
        fontSize: 18
    }
});

export default ProfilePage;
