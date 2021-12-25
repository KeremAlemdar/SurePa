import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { db } from '../../services/DbCon';

const AddMedicinePage = ({ navigation }) => {
    const [serverData, setServerData] = useState([]);

    useEffect(() => {
        const arr = [];
        let id = 0;
        db.collection("medicines").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                arr.push({id: id++, name: doc.data().Medicine_name});
            });
            setServerData(arr);
        });
    }, []);


    return (
        <View>
            <Text> AddMedicinePag </Text>
            <View>
                <SearchableDropdown
                    onTextChange={(text) => console.log(text)}
                    //On text change listner on the searchable input
                    onItemSelect={(item) => alert(JSON.stringify(item))}
                    //onItemSelect called after the selection from the dropdown
                    containerStyle={{ padding: 5 }}
                    //suggestion container style
                    textInputStyle={{
                        //inserted text style
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        backgroundColor: '#FAF7F6',
                    }}
                    itemStyle={{
                        //single dropdown item style
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#FAF9F8',
                        borderColor: '#bbb',
                        borderWidth: 1,
                    }}
                    itemTextStyle={{
                        //text style of a single dropdown item
                        color: '#222',
                    }}
                    itemsContainerStyle={{
                        //items container style you can pass maxHeight
                        //to restrict the items dropdown hieght
                        maxHeight: '50%',
                    }}
                    items={serverData}
                    //mapping of item array
                    defaultIndex={2}
                    //default selected item index
                    placeholder="placeholder"
                    //place holder for the search input
                    resetValue={false}
                    //reset textInput Value with true and false state
                    underlineColorAndroid="transparent"
                //To remove the underline from the android input
                />
            </View>

        </View>
    )
};
export default AddMedicinePage;
