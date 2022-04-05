import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';



const MultipleChoiceChecklist = ({
    data,
    question,
    selectedItem,
    setSelectedItem,
}) => {
    return (
        <View>

            <Text style={styles.header}>{question}</Text>
            {data.map(item => {
                const { name, id } = item;
                return (
                    <Pressable key={id} style={selectedItem == id ? styles.selected_option : styles.option} onPress={() => { setSelectedItem(id) }}>
                        <Text style={selectedItem == id ? styles.selected_option_text : styles.option_text}>{name}</Text>
                    </Pressable>
                );
            })}
        </View>
    )
};
const styles = StyleSheet.create({
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    option: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 1,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    option_text: {
        fontSize: 14,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'black',
    },
    selected_option_text: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: '#d4e9ee',
    },
    selected_option: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 1,
        borderRadius: 10,
        // backgroundColor: '#2f8295',
        backgroundColor: '#64acbd',
    },

    // button: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     paddingVertical: 12,
    //     borderRadius: 10,
    //     backgroundColor: '#d4e9ee',
    // },
    // button_text: {
    //     fontSize: 16,
    //     lineHeight: 21,
    //     fontWeight: 'bold',
    //     letterSpacing: 0.25,
    //     color: '#2f8295',
    // },
});
export default MultipleChoiceChecklist;
