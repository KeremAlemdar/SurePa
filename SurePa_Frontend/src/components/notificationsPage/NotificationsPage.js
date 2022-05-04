import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { auth } from '../../services/DbCon';
import commonStyle from '../../commonStyle';
import { acceptNotification, cancelNotification, getNotifications } from '../../services/PatientController';
import CommonButton from '../button/Button';
import NotificationCard from '../notificationCard/notificationCard';

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
        <ScrollView style={commonStyle.mainDiv}>
            <View style={styles.notificationList}>
                {notifications.map((row, index) => {
                    return (
                        <NotificationCard status={row.status}>
                            <Text>{`${row.name}    ${row.time}`}</Text>
                            {
                                row.status !== 'accepted' ? (
                                    <>
                                        <CommonButton text="İptal" onPress={() => cancelNotificationLocal(row)}></CommonButton>
                                        <CommonButton text="Kabul" onPress={() => {
                                            acceptNotificationLocal(row);
                                            const copyNotifs = [...notifications];
                                            copyNotifs[index].status = "accepted";
                                            setNotifications(copyNotifs);
                                        }}></CommonButton>
                                    </>
                                ) : null
                            }
                        </NotificationCard>
                    )
                })}
            </View>
        </ScrollView >)
};
const styles = StyleSheet.create({
    notificationList: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 15,
    }
});

export default NotificationsPage;
