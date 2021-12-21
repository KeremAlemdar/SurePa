import React, { useEffect, useState } from 'react';
import { View, Text, ViewBase } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
const Main = () => {
    return (
        <View style={styles.all}>
            <View style={styles.menu}>
                <View style={styles.menuItem}>
                    <View><Image style={styles.image} source={require('../../../img/medicine.jpg')} /></View>
                    <View><Text style={styles.header}>Medicines</Text></View>
                </View>
                <View style={styles.menuItem}>
                    <View><Image style={styles.image} source={require('../../../img/profile.png')} /></View>
                    <View><Text style={styles.header}>Profile</Text></View>
                </View>
                <View style={styles.menuItem}>
                    <View><Image style={styles.image} source={require('../../../img/profile.png')} /></View>
                    <View><Text style={styles.header}>Add Caregiver</Text></View>
                </View>
                <View style={styles.menuItem}>
                    <View><Image style={styles.image} source={require('../../../img/medicine.jpg')} /></View>
                    <View><Text style={styles.header}>Add Medicine</Text></View>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    all: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    menu: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
    },
    menuItem: {
        width: '45%',
        height: '45%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 5,
    },
    image: {
        width: '100%',
        height: '80%',
        borderRadius: 17,
        backgroundColor: "white",
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: "-20%",
    }
});

export default Main;