import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import commonStyle from '../../commonStyle';
import SendSMS from 'react-native-sms'

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

    const sendSMS = () => {
        SendSMS.send({
            body: 'The default body of the SMS!',
            recipients: ['0123456789', '9876543210'],
            successTypes: ['sent', 'queued'],
            allowAndroidSendWithoutReadPermission: true
        }, (completed, cancelled, error) => {

            console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);

        });
    };

    return (
        <View style={commonStyle.mainDiv}>
            <View style={styles.all}>
                <View style={styles.menu}>
                    <View onTouchEnd={() => setDirectPage('NotificationsPage')} style={styles.menuItem}>
                        <View><Image style={styles.image} source={require('../../../img/medicine.jpg')} /></View>
                        <View><Text style={styles.header}>Notifications</Text></View>
                    </View>
                    <View style={styles.menuItem}>
                        <TouchableOpacity
                            style={styles.emergencyButton}
                            onPress={() => sendSMS()}>
                            <View style={styles.emergencyButtonContentWrapper}>
                                <View><Image style={styles.emergencyButtonIcon} source={require('../../../img/emergency-call.png')} /></View>
                                <Text style={styles.emergencyButtonText}>
                                    Emergency
                                </Text>
                                <Text style={styles.emergencyButtonText}>
                                    Button
                                </Text>
                            </View>
                        </TouchableOpacity>
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
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    menuItem: {
        width: '40%',
        height: '80%',
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
    },
    emergencyButton: {
        backgroundColor: '#eeaaaf',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 15,
        width: '100%',
        height: '80%',
        borderRadius: 17
    },
    emergencyButtonText: {
        fontSize: 15,
        fontWeight: '800',
        color: '#fff',
        textAlign: 'center',
    },
    emergencyButtonIcon: {
        width: 75,
        height: 75,
        marginBottom: 50
    },
    emergencyButtonContentWrapper:{
        display:'flex',
        justifyContent: 'center',
        alignContent:'space-around'
    }

    /*
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    }*/
});

export default HomePage;