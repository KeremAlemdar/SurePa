import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { auth, db } from '../../services/DbCon';
import DropDown from '../dropDown/DropDown';
const AddMedicinePage = () => {
    const [medicinesArr, setMedicineArr] = useState([]);
    const [doseArr, setDoseArr] = useState([]);
    const [number, onChangeNumber] = React.useState(null);
    const [selectedMedicine, setSelectedMedicine] = useState(undefined);
    const [selectedDose, setSelectedDose] = useState(undefined);

    useEffect(() => {
        const arr = [];
        let count = 0;
        db.collection("medicines").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                arr.push({ id: count, medId: `${doc.id}`, name: doc.data().Medicine_name, dozeCount: doc.data().Doze_count });
                count++;
            });
            setMedicineArr(arr);
        });
    }, []);

    useEffect(() => {
        if (selectedMedicine) {
            const { medId, dozeCount } = selectedMedicine;
            const arr = [];

            for (let i = 0; i < dozeCount + 1; i++) {
                let doseName = "";
                let doseData;
                db.collection("medicines").doc(medId).collection(i.toString()).get("dose").then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if (doc.data().MG) {
                            doseName += `MG: ${doc.data().MG} `;
                        }
                        if (doc.data().ML) {
                            doseName += `ML: ${doc.data().ML} `
                        }
                        if (doc.data().Gram) {
                            doseName += `Gram: ${doc.data().Gram} `
                        }
                        if (doc.data().Ampul) {
                            doseName += `Ampul: ${doc.data().Ampul} `
                        }
                        if (doc.data().Kapsul) {
                            doseName += `Kapsul: ${doc.data().Kapsul} `
                        }
                        if (doc.data().Tablet) {
                            doseName += `Tablet: ${doc.data().Tablet} `
                        }

                        doseData = doc.data();
                    });
                    arr.push({ id: i, name: doseName, doseData});
                });
            }
            setDoseArr(arr);
        }
    }, [selectedMedicine]);

    const addMedicine = () => {
        const{uid} = auth.currentUser;
        // db.collection("medicines").doc(selectedMedicine.id).collection("medicines").
        db.collection("users").doc(uid).collection("medicines").doc(selectedMedicine.name).set({
            name: selectedMedicine.name,
            numberOfDose: number,
            ...selectedDose.doseData
        })
    };

    return (
        <View>
            <Text> AddMedicinePag </Text>
            <View>
                <DropDown
                    serverData={medicinesArr}
                    setSelectedItem={setSelectedMedicine}
                    selectedItem={selectedMedicine}
                />
                {(selectedMedicine && 1) &&
                    <DropDown
                        serverData={doseArr}    
                        setSelectedItem={setSelectedDose}
                        selectedItem={selectedDose}
                    />
                }
                <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Enter the number of dose per day"
                keyboardType="numeric"
                ></TextInput>
                {(selectedDose && 1) && 
                <Button title="Ekle" onPress={addMedicine}></Button>
                }
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
export default AddMedicinePage;
