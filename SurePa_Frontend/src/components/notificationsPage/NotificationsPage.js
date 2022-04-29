import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth, db } from '../../services/DbCon';
import { acceptNotification, cancelNotification, createNotification, deleteNotification, getNotifications } from '../../services/PatientController';

const NotificationsPage = ({ navigation }) => {
    const [notifications, setNotifications] = useState([]);
    const [ready, setReady] = useState(false);


    useEffect(() => {
        getNotifications().then(data => {
            console.log('gg')
            console.log(data);
            setReady(true);
        })
        // setReady(true);
        // if (notifications.length != 0) {
        //     console.log(notifications[0].currentData);
        // }
    }, []);

    
    // const createNotificationLocal = () => {
    //     const { uid } = auth.currentUser;
    //     createNotification(uid);
    // };
    // const cancelNotificationLocal = (id) => {
    //     const { uid } = auth.currentUser;
    //     cancelNotification(uid, id);
    // };
    // const acceptNotificationLocal = (id) => {
    //     const { uid } = auth.currentUser;
    //     acceptNotification(uid, id);
    // };
    // const deleteNotificationLocal = (id) => {
    //     const { uid } = auth.currentUser;
    //     deleteNotification(uid,id);
    // };
    return (
        <View>
            <Text> NotificationsPage </Text>
            {/* <View style={styles.notificationList}>
                {notifications.map((row) => {
                    return (
                        <View key={row.id} style={styles.singleMedicineRow}>
                            <Text style={styles.text}>{row.currentData.description}</Text>
                            <Text style={styles.text}>{row.currentData.status}</Text>
                            <Button title="Sil" onPress={() => deleteNotificationLocal(row.id)}></Button>
                            <Button title="İptal" onPress={() => cancelNotificationLocal(row.id)}></Button>
                            <Button title="Kabul" onPress={() => acceptNotificationLocal(row.id)}></Button>
                        </View>
                    )
                }
                )}
            </View>
            <Button title="Yeni Yarat" onPress={createNotificationLocal}></Button> */}
        </View>
    )
};
const styles = StyleSheet.create({
    notificationList: {
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

export default NotificationsPage;
