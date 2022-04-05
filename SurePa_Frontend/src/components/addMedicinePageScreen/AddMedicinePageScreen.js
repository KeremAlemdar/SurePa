import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { auth, db } from '../../services/DbCon';
import DropDown from '../dropDown/DropDown';
import { addMedicine } from '../../services/PatientController';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Type from './Type';
import Finalize from './Finalize';
import NumberOfTimes from './NumberOfTimes';
import Name from './Name';

const AddMedicinePageStack = createNativeStackNavigator();

const AddMedicinePageScreen = () => {
    const routes = [
        { name: 'Name', component: Name, options: { headerShown: false } },
        { name: 'Type', component: Type, options: { headerShown: false } },
        { name: 'NumberOfTimes', component: NumberOfTimes, options: { headerShown: false } },
        { name: 'Finalize', component: Finalize, options: { headerShown: false } },
    ]
    return (
        <AddMedicinePageStack.Navigator>
            {routes.map(route => {
                const { name, component, options } = route;
                return (
                    <AddMedicinePageStack.Screen
                        key={name}
                        name={name}
                        component={component}
                        options={options}
                    />
                );
            })}
        </AddMedicinePageStack.Navigator>
    );
}
export default AddMedicinePageScreen;