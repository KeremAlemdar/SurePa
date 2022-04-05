import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';

const Finalize = ({ medicineName, birim, selectedOption }) => {
    return (
        <View>
            <Text>{medicineName}</Text>
            <Text>{birim}</Text>
            <Text>{selectedOption}</Text>
        </View>
    );
}

export default Finalize;