import React, { useEffect } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

const CommonButton = ({ onClick, customStyle, text }) => {

    const styles = StyleSheet.create({
        button: {           
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 4,
            backgroundColor: '#00BFFF',
            elevation: 3,
            ...customStyle,
        },
        text: {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'white',
        },
    });

    return (
        <Pressable style={styles.button} onPress={() => onClick()}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

export default CommonButton;