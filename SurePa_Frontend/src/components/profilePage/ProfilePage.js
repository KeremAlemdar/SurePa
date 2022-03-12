import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import commonStyle from '../../commonStyle';

const ProfilePage = ({ navigation }) => {
    const [directPage, setDirectPage] = useState('');

    useEffect(() => {
        if (directPage !== '') {
            navigation.navigate(directPage);
        }
    }, [directPage]);    

    return (
        <View style={commonStyle.mainDiv}>
            <View style={commonStyle.container}>
                <Button title="See Invitations" onPress={() => setDirectPage('InvitationsPage')}></Button>
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
