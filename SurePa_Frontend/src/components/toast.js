import React from 'react';
import { View, Text } from 'react-native';
import  { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
    success: ({props}) => (
        <BaseToast
            text1={props.text1}
            style={{ borderLeftColor: 'green', marginTop: -20 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
                fontWeight: '400'
            }}
        >
        </BaseToast>
    ),
    error: (props) => (
        <ErrorToast
            text1={props.text1}
            style={{ borderLeftColor: 'red', marginTop: -20 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 17
            }}
            text2Style={{
                fontSize: 15
            }}
        />
    ),
    tomatoToast: ({ text1, props }) => (
        <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
            <Text>{text1}</Text>
            <Text>{props.uuid}</Text>
        </View>
    )
};