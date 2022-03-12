import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import commonStyle from '../../commonStyle';
const HomePage = ({ navigation }) => {
    const [directPage, setDirectPage] = useState('');

    // isSignedIn ? (
    //     <>
    //       <Stack.Screen name="Home" component={HomeScreen} />
    //       <Stack.Screen name="Profile" component={ProfileScreen} />
    //       <Stack.Screen name="Settings" component={SettingsScreen} />
    //     </>
    //   ) : (
    //     <>
    //       <Stack.Screen name="SignIn" component={SignInScreen} />
    //       <Stack.Screen name="SignUp" component={SignUpScreen} />
    //     </>
    //   )

    // <Stack.Screen
    //     name="SignIn"
    //     component={SignInScreen}
    //     options={{
    //       title: 'Sign in',
    //       // When logging out, a pop animation feels intuitive
    //       // You can remove this if you want the default 'push' animation
    //       animationTypeForReplace: state.isSignout ? 'pop' : 'push',
    //     }}
    //   />

    useEffect(() => {
        if (directPage !== '') {
            navigation.navigate(directPage);
        }
    }, [directPage]);

    return (
        <View style={commonStyle.mainDiv}>
            <View style={styles.all}>
                <View style={styles.menu}>
                    <View onTouchEnd={() => setDirectPage('MedicinesPage')} style={styles.menuItem}>
                        <View><Image style={styles.image} source={require('../../../img/medicine.jpg')} /></View>
                        <View><Text style={styles.header}>Medicines</Text></View>
                    </View>
                    <View onTouchEnd={() => setDirectPage('ProfilePage')} style={styles.menuItem}>
                        <View><Image style={styles.image} source={require('../../../img/profile.png')} /></View>
                        <View><Text style={styles.header}>Profile</Text></View>
                    </View>
                    <View onTouchEnd={() => setDirectPage('AddCareGiverPage')} style={styles.menuItem}>
                        <View><Image style={styles.image} source={require('../../../img/profile.png')} /></View>
                        <View><Text style={styles.header}>Add Caregiver</Text></View>
                    </View>
                    <View onTouchEnd={() => setDirectPage('AddMedicinePage')} style={styles.menuItem}>
                        <View><Image style={styles.image} source={require('../../../img/medicine.jpg')} /></View>
                        <View><Text style={styles.header}>Add Medicine</Text></View>
                    </View>
                    <View onTouchEnd={() => setDirectPage('NotificationsPage')} style={styles.menuItem}>
                        <View><Image style={styles.image} source={require('../../../img/medicine.jpg')} /></View>
                        <View><Text style={styles.header}>Notifications</Text></View>
                    </View>
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
        width: '30%',
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

export default HomePage;