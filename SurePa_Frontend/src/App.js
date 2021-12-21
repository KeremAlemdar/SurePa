import React from 'react';
import Home from './pages/SurePa';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/loginPage';
import Main from './components/mainPage';
import Signup from './components/signUpPage';
const Stack = createNativeStackNavigator();

const App = () => {
    const routes = [
        { name: 'Main', component: Main, options: {title: 'Home'}},
        { name: 'Login', component: Login, options: {title: 'Login Page'}},
        { name: 'Home', component: Home, options: {title: 'Home Page'}},
        { name: 'Signup', component: Signup, options: {title: 'Signup Page'}}
    ]
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {routes.map(route => {
                        const { name, component, options } = route;
                        return (
                            <Stack.Screen
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