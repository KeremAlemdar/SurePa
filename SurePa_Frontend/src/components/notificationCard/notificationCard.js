import React from "react"
import { StyleSheet, View, } from "react-native"

const NotificationCard = ({
    status,
    children
}) => {

    const styles = StyleSheet.create({
        heading: {
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 8,
        },
        card: {
            backgroundColor: 'white',
            borderRadius: 8,
            borderWidth: 4,
            borderColor: status === 'non' ? 'white' : status === "accepted" ? "#aae087" : status === "waiting" ? "#d4e9ee" : "#ff0000",
            paddingVertical: 20,
            paddingHorizontal: 25,
            marginVertical: 10,
            marginRight: 10,
            marginLeft: 10,
        },
        elevation: {
            elevation: 5,
            shadowColor: '#52006A',
        },
    });
    return (
        <View style={[styles.card, styles.elevation]}>
            {children}
        </View>
    )
}

export default NotificationCard;
