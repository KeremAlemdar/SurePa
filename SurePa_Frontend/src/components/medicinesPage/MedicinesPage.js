import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { auth, db } from '../../services/DbCon';
import { deleteMedicine } from '../../services/PatientController';
import commonStyle from '../../commonStyle';
import CommonButton from '../button';
import NotificationCard from '../notificationCard/notificationCard';


const MedicinesPage = ({ navigation }) => {
    const [directPage, setDirectPage] = useState('');
    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        const arr = [];
        const { uid } = auth.currentUser;

        db.collection("users").doc(uid).collection("medicines").get().then((querySnapshot) => {
            querySnapshot.forEach((doc, id) => {
                arr.push({ id: id, currentData: doc.data() });
            });
            setMedicines(arr);
        })
    }, []);

    useEffect(() => {
        if (directPage !== '') {
            navigation.navigate(directPage);
        }
    }, [directPage]);


    const deleteMedicineLocal = (selectedMedicine) => {
        const { uid } = auth.currentUser;
        const newMedicines = medicines.filter(medicine => medicine.currentData.name !== selectedMedicine);
        setMedicines(newMedicines);
        deleteMedicine(uid, selectedMedicine);
    };
    const addMedicine = (where) => {
        setDirectPage(where);
    };

    return (
        <ScrollView style={commonStyle.mainDiv}>
            <View>
                <CommonButton text='Add Medicine' onPress={() => addMedicine('AddMedicinePageScreen')} />
                <CommonButton text='Add Activity' onPress={() => addMedicine('AddActivityPageScreen')} />
                <CommonButton text='Add Blood Sugar' onPress={() => addMedicine('AddBloodSugar')} />
            </View>
            <View style={styles.medicineList}>
                {medicines.map((row, id) => {
                    return (
                        <NotificationCard key={id} status={'non'}>
                            <Text style={styles.text}>{`Name: ${row.currentData.name}\nRemaining: ${row.currentData.numberOfDose}`}</Text>
                            <CommonButton type={'delete'} text='Sil' onPress={() => deleteMedicineLocal(row.currentData.name)} />
                        </NotificationCard>
                    )
                }
                )}
            </View>
        </ScrollView>
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
        alignItems: 'center',
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
    },
    medicine_button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 1,
        borderRadius: 10,
        backgroundColor: '#24263a',
    },
    medicine_button_text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }
});

export default MedicinesPage;
