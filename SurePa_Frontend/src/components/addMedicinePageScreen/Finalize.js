import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';

const Finalize = ({ medicineName, birim, doseCount }) => {
    return (
        <View>
            <Text>{medicineName}</Text>
            <Text>{birim}</Text>
            <Text>{doseCount}</Text>
        </View>
    );
}

export default Finalize;