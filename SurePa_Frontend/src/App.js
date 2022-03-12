import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/loginPage';
import HomePage from './components/homePage';
import Signup from './components/signUpPage';
import ProfilePage from './components/profilePage';
import AddMedicinePage from './components/addMedicinePage';
import AddCareGiverPage from './components/addCareGiverPage';
import NotificationsPage from './components/notificationsPage';
import MedicinesPage from './components/medicinesPage/MedicinesPage';
import AddThings from './components/addThings';
const Stack = createNativeStackNavigator();

const App = () => {
    const routes = [
        { name: 'Login', component: Login, options: { title: 'Login' } },
        { name: 'HomePage', component: HomePage, options: { title: 'Home' } },
        { name: 'ProfilePage', component: ProfilePage, options: { title: 'Profile' } },
        { name: 'AddMedicinePage', component: AddMedicinePage, options: { title: 'Add Medicine' } },
        { name: 'AddThings', component: AddThings, options: { title: 'Add Things' } },
        { name: 'AddCareGiverPage', component: AddCareGiverPage, options: { title: 'Add Care Giver' } },
        { name: 'MedicinesPage', component: MedicinesPage, options: { title: 'Medicines' } },
        { name: 'NotificationsPage', component: NotificationsPage, options: { title: 'NotificationsPage' } },
        { name: 'Signup', component: Signup, options: { title: 'Signup' } }
    ]
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {routes.map(route => {
                    const { name, component, options } = route;
                    return (
                        <Stack.Screen
                            key={name}
                            name={name}
                            component={component}
                            options={options}
                        />
                    );
                })}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;