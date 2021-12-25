import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { db } from '../../services/DbCon';

const AddMedicinePage = ({ navigation }) => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("java");

    const [ready, setReady] = useState(false);
    useEffect(() => {

    }, []);

    const setItems = () => {
        var count = 0;
        db.collection("medicines").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                return (<Picker.Item label={doc.data().Medicine_name} value={doc.data().Medicine_name} />)
                // setItems(items.push(doc.data().Medicine_name));
            });
        });
        setReady(true);
        console.log(items);
    }
    return (
        <View>
            <Text> AddMedicinePag </Text>
            <View>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    {setItems()}
                </Picker>
            </View>

        </View>
    )
};
export default AddMedicinePage;
