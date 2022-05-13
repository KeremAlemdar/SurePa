import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import CommonButton from '../button';
import CardView from '../cardView';

const List = ({
    data,
    accept,
    deny,
}) => {

    const renderChild = (row, id) => {
        return (
            <CardView title={row.name} text={'Waiting invitation'} key={id}>
                {accept && <CommonButton text="Accept" customStyle={{ button: { backgroundColor: '#dbeed4' }, text: {color: 'gray'} }} onPress={() => accept(row.uid)}></CommonButton>}
                {deny && <CommonButton text="Delete" customStyle={{ button: { backgroundColor: '#eeaaaf' }, text: {color: 'white'} }} onPress={() => deny(row.uid)}></CommonButton>}
            </CardView>
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
