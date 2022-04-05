import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

const CommonButton = ({ onPress, customStyle, text }) => {

    const styles = StyleSheet.create({
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            borderRadius: 10,
            backgroundColor: '#d4e9ee',
            marginTop: 10,
            ...customStyle?.button
        },
        button_text: {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: '#2f8295',
            ...customStyle?.text
        },
    });

    return (
        <Pressable style={styles.button} onPress={() => onPress()}>
            <Text style={styles.button_text}>{text}</Text>
        </Pressable>
    );
};

export default CommonButton;