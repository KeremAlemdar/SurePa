import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { auth } from '../../services/DbCon';
import commonStyle from '../../commonStyle';
import { acceptNotification, getNotifications } from '../../services/PatientController';
import CommonButton from '../button/Button';
import NotificationCard from '../notificationCard/notificationCard';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getNotificationsLocal();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const getNotificationsLocal = () => {
        const now = new Date();
        const arr = [];
        getNotifications().then((notifications) => {
            notifications.forEach((notification) => {
                const times = notification.times.map((time, id) => {
                    const pillTime = new Date();
                    const hour = time.split(":")[0];
                    const minute = time.split(":")[1];
                    pillTime.setHours(hour, minute, 0, 0);
                    const stat = notification.usage[id] === true ? 'accepted' :
                        (now.getTime() < pillTime.getTime() ? "waiting" : "expired");
                    return {
                        name: notification.name,
                        timeVal: time,
                        time: pillTime,
                        status: stat,
                        dayValue: notification.dayValue,
                        id: id,
                        numberOfDose: notification.numberOfDose,
                    }
                });
                arr.push(...times);
            });
            arr.sort((a, b) => a.time.getTime() - b.time.getTime());
            setNotifications(arr);

        });
    };

    useEffect(() => {
        getNotificationsLocal();
    }, []);

    const acceptNotificationLocal = (notif) => {
        const { uid } = auth.currentUser;
        acceptNotification(uid, notif);
    };
    return (
        <ScrollView style={commonStyle.mainDiv}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
            <View style={styles.notificationList}>
                {notifications.map((row, index) => {
                    return (
                        <NotificationCard key={index} status={row.status}>
                            <Text>{`${row.name}    ${row.timeVal}`}</Text>
                            {
                                (row.status === 'waiting' || row.status === 'expired') ? (
                                    <>
                                        <CommonButton text="Taken" onPress={() => {
                                            acceptNotificationLocal(row);
                                            const copyNotifs = [...notifications];
                                            copyNotifs[index].status = "accepted";
                                            setNotifications(copyNotifs);
                                        }}>
                                        </CommonButton>
                                    </>
                                ) : null
                            }
                        </NotificationCard>
                    )
                })
                }
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
