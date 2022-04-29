import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';

const Finalize = ({ medicineName, type, doseCount, perDay, times }) => {
    return (
        <View>
            <Text>{medicineName}</Text>
            <Text>{type}</Text>
            <Text>{doseCount}</Text>
            <Text>{perDay}</Text>
            <Text>{times.join(',')}</Text>
        </View>
    );
}

export default Finalize;