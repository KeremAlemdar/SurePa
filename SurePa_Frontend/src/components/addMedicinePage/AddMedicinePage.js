import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { db } from '../../services/DbCon';
import DropDown from '../dropDown/DropDown';
import { auth } from '../../services/SurePaServices';

const AddMedicinePage = () => {
    const [medicinesName, setMedicineName] = useState([]);
    const [doseArr, setDoseArr] = useState([]);

    const [selectedItem, setSelectedItem] = useState(undefined);
    const [selectedDose, setSelectedDose] = useState(undefined);

    useEffect(() => {
        const arr = [];
        db.collection("medicines").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                arr.push({ medId: `${doc.id}`, name: doc.data().Medicine_name, dozeCount: doc.data().Doze_count });
            });
            setMedicineName(arr);
        });
    }, []);

    useEffect(() => {
        if (selectedItem) {
            const { medId, dozeCount } = selectedItem;
            const arr = [];

            for (let i = 0; i < dozeCount + 1; i++) {
                let doseName = "";
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
                    });
                    arr.push({ id: i, name: doseName });
                });
            }
            setDoseArr(arr);
        }
    }, [selectedItem]);

    const addMedicine = () => {

    };

    return (
        <View>
            <Text> AddMedicinePag </Text>
            <View>
                <DropDown
                    serverData={medicinesName}
                    setSelectedItem={setSelectedItem}
                    selectedItem={selectedItem}
                />
                {(selectedItem && 1) &&
                    <DropDown
                        serverData={doseArr}
                        setSelectedItem={setSelectedDose}
                        selectedItem={selectedDose}
                    />
                }
            </View>
        </View>
    )
};
export default AddMedicinePage;
