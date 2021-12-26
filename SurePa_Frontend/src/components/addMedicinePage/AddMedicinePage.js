import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { db } from '../../services/DbCon';
import DropDown from '../dropDown/DropDown';

const AddMedicinePage = ({ navigation }) => {
    const [serverData, setServerData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(undefined);

    useEffect(() => {
        const arr = [];
        let id = 0;
        db.collection("medicines").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                arr.push({ id: `${doc.id}/${doc.data().Doze_count}`, name: doc.data().Medicine_name });
            });
            setServerData(arr);
        });
    }, []);

    useEffect(() => {
        if (selectedItem) {
            console.log(selectedItem);
            const arr = [];
            // db.collection("medicines").doc(selectedItem.id).get().then((querySnapshot) => {
            //     console.log(querySnapshot);
            //     querySnapshot.forEach((doc) => {
            //         // arr.push({ id: id++, name: doc.data().Medicine_name });
            //         console.log(doc);
            //     });
            //     setServerData(arr);
            // });
        }
    }, [selectedItem]);


    return (
        <View>
            <Text> AddMedicinePag </Text>
            <View>
                <DropDown
                    serverData={serverData}
                    setSelectedItem={setSelectedItem}
                    selectedItem={selectedItem}
                />
            </View>

        </View>
    )
};
export default AddMedicinePage;
