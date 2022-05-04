import React, { Children } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CardView = ({
    title,
    text,
    children
}) => {
    return (
        <View style={[styles.card, styles.elevation, { zIndex: -10 }]}>
            <View>
                <Text style={styles.heading}>
                    {title}
                </Text>
            </View>
            <View
                style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: 0.5,
                    marginBottom: 10,
                }}
            />
            <Text>
                {text}
            </Text>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    heading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
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

export default CardView;