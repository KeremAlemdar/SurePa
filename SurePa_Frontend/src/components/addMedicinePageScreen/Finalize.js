import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import commonStyle from '../../commonStyle';

const Finalize = ({ times }) => {
    return (
        <View>
            <Text style={commonStyle.headerText}>{'Times: ' + times.join(',')}</Text>
        </View>
    );
}

export default Finalize;