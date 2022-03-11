import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getCaregivers } from '../../services/PatientController';

const ProfilePage = ({ navigation }) => {
    const [careGivers, setCaregivers] = useState([]);

    useEffect(() => {
        getCaregivers().then(res => {
            setCaregivers(res);
        });
    }, []);
    
    return (
        <View>
            <View style={styles.medicineList}>
                {careGivers.map((row,id) => {
                    return (
                        <View key={id} style={styles.singleMedicineRow}>
                            <Text style={styles.text}>{row.name}</Text>
                            <Button title="X" onPress={() => console.log('asd')}></Button>
                        </View>
                    )
                }
                )}
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
