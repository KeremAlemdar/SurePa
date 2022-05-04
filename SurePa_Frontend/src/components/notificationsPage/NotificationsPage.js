import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../../services/DbCon';
import { acceptNotification, cancelNotification, getNotifications } from '../../services/PatientController';

const NotificationsPage = ({ navigation }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const now = new Date();
        getNotifications().then((notifications) => {
            const notifs = notifications.map((notification) => {
                const times = notification.times.map((time, id) => {
                    const pillTime = new Date();
                    const hour = time.split(":")[0];
                    const minute = time.split(":")[1];
                    pillTime.setHours(hour, minute, 0, 0);
                    const stat = notification.usage[id] === true ? 'accepted' :
                        (now.getTime() < pillTime.getTime() ? "waiting" : "expired");
                    return {
                        name: notification.name,
                        time: time,
                        status: stat,
                        dayValue: notification.dayValue,
                        id: id
                    }
                });
                return times;
            });
            setNotifications(notifs[0]);
        });
    }, []);

    const cancelNotificationLocal = (id) => {
        const { uid } = auth.currentUser;
        cancelNotification(uid, id);
    };
    const acceptNotificationLocal = (notif) => {
        const { uid } = auth.currentUser;
        acceptNotification(uid, notif);
    };
    return (
        <View>
            <Text> NotificationsPage </Text>
            <View style={styles.notificationList}>
                {notifications.map((row, index) => {
                    return (
                        <View key={row.id} style={styles.singleMedicineRow}>
                            <Text style={styles.text}>{row.name}</Text>
                            <Text style={styles.text}>{row.status}</Text>
                            <Button title="İptal" onPress={() => cancelNotificationLocal(row)}></Button>
                            <Button title="Kabul" onPress={() => {
                                acceptNotificationLocal(row);
                                const copyNotifs = [...notifications];
                                copyNotifs[index].status = "accepted";
                                setNotifications(copyNotifs);
                            }}></Button>
                        </View>
                    )
                })}
            </View>
        </View >)
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
