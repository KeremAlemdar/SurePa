import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
import { auth, db } from '../../services/DbCon';
import { returnPatient } from '../../services/PatientController';
import { deleteMedicine } from '../../services/PatientController';
import commonStyle from '../../commonStyle';


const MedicinesPage = ({ navigation }) => {
    const [medicines, setMedicines] = useState([]);
    const [ready, setReady] = useState(false);


    useEffect(() => {
        getMedicines();
        setReady(true);
        if (medicines.length != 0) {
            console.log(medicines[0].currentData);
        }
    }, []);

    const getMedicines = () => {
        const arr = [];
        const { uid } = auth.currentUser;
        let currentData;
        let count = 0;

        db.collection("users").doc(uid).collection("medicines").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                currentData = doc.data();
                arr.push({ id: count, currentData });
                count = count + 1;
            });
            setMedicines(arr);
        })
    };
    const printMedicines = () => {
        return (<Text>deneme</Text>);
    };

    const deleteMedicineLocal = () => {
        const { uid } = auth.currentUser;
        deleteMedicine(uid, selectedMedicine.name);
    };
    const addMedicine = () => {
    };

    return (
        <View style={commonStyle.mainDiv}>
            <View>
                <Pressable style={styles.button} onPress={addMedicine}>
                    <Text style={styles.button_text}>Ekle</Text>
                </Pressable>
            </View>
            <View style={styles.medicineList}>
                {medicines.map((row, id) => {
                    return (
                        <View key={id} style={styles.singleMedicineRow}>
                            <Text style={styles.text}>{row.currentData.name}</Text>
                            <Text style={styles.text}>{row.currentData.numberOfDose}</Text>
                            <Button title="Sil" onPress={deleteMedicineLocal}></Button>
                        </View>
                    )
                }
                )}
            </View>
            {/* {printMedicines} */}
            {/* <Button title="Printle" onPress={() => { console.log(medicines[0].currentData.MG) }}></Button> */}
        </View>
    )
};
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: '#d4e9ee',
      },
      button_text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#2f8295',
      },
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

export default MedicinesPage;
