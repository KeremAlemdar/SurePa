import React from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';

const DropDown = ({
    setSelectedItem,
    serverData,
    selectedItem
}) => {
    return (
        <SearchableDropdown
            onTextChange={(item) => null}
            //On text change listner on the searchable input
            onItemSelect={(item) => setSelectedItem(item)}
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
                maxHeight: '80%',
            }}
            items={serverData}
            //mapping of item array
            defaultIndex={0}
            //default selected item index
            placeholder="placeholder"
            //place holder for the search input
            resetValue={false}
            //reset textInput Value with true and false state
            underlineColorAndroid="transparent"
        //To remove the underline from the android input
        />
    )
};

export default DropDown;
