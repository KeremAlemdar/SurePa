import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './components/loginPage';
import HomePage from './components/homePage';
import Signup from './components/signUpPage';
import ProfilePage from './components/profilePage';
import AddMedicinePage from './components/addMedicinePage';
import AddCareGiverPage from './components/addCareGiverPage';
import NotificationsPage from './components/notificationsPage';
import MedicinesPage from './components/medicinesPage/MedicinesPage';
import AddThings from './components/addThings';
import InvivtationsPage from './components/invitationsPage/InvivtationsPage';
import { auth } from './services/DbCon';
const Stack = createNativeStackNavigator();

const MedicinesPageStack = createNativeStackNavigator();
function MedicinesPageStackScreen() {
    const MedicinesPageRoutes = [
        { name: 'MedicinesPage', component: MedicinesPage, options: { headerShown: false } },
        { name: 'AddMedicinePage', component: AddMedicinePage, options: { title: 'Add Medicines' } },
        { name: 'AddThings', component: AddThings, options: { title: 'Add Things' } }
    ]
    return (
        <MedicinesPageStack.Navigator>
            {MedicinesPageRoutes.map(route => {
                const { name, component, options } = route;
                return (
                    <MedicinesPageStack.Screen
                        key={name}
                        name={name}
                        component={component}
                        options={options}
                    />
                );
            })}
        </MedicinesPageStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
function HomeStackScreen() {
    const unused = [
        { name: 'Login', component: Login, options: { title: 'Login' } },
        { name: 'Signup', component: Signup, options: { title: 'Signup' } },
        { name: 'AddMedicinePage', component: AddMedicinePage, options: { title: 'Add Medicine' } },
        { name: 'AddThings', component: AddThings, options: { title: 'Add Things' } },
        { name: 'AddCareGiverPage', component: AddCareGiverPage, options: { title: 'Add Care Giver' } },
        { name: 'InvitationsPage', component: InvivtationsPage, options: { title: 'See Invivtations' } },
        { name: 'NotificationsPage', component: NotificationsPage, options: { title: 'NotificationsPage' } },
    ]
    const routes = [
        { name: 'HomePage', component: HomePage, options: { title: 'Home' } },
        { name: 'MedicinesPage', component: MedicinesPageStackScreen, options: { title: 'Medicines' } },
        { name: 'ProfilePage', component: ProfilePage, options: { title: 'Profile' } }
    ]
    return (
        <Tab.Navigator>
            {routes.map(route => {
                const { name, component, options } = route;
                return (
                    <Tab.Screen
                        key={name}
                        name={name}
                        component={component}
                        options={options}
                    />
                );
            })}
        </Tab.Navigator>
    );
}

const App = () => {
    let routes = [
        { name: 'Login', component: Login, options: { headerShown: false } },
        { name: 'HomeStack', component: HomeStackScreen, options: { headerShown: false} },
        { name: 'Signup', component: Signup, options: { headerShown: false } }
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