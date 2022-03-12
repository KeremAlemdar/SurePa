import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const List = ({
    data,
    accept,
    deny,
}) => {

    const renderChild = (row, id) => {
        return (
            <View key={id} style={styles.singleMedicineRow}>
                <Text style={styles.text}>{row.name}</Text>
                <Button title="Onayla" onPress={() => accept(row.uid)}></Button>
                <Button title="Sil" onPress={() => deny(row.uid)}></Button>
            </View>
        )
    };
    
    return (
        <View style={styles.medicineList}>
            {data.map((row, id) => {
                return (
                    renderChild(row, id)
                )
            })}
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

export default List;
