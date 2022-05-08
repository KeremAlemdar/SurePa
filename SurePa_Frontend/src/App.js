import React from 'react';
import { Button, Image, LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './components/loginPage';
import HomePage from './components/homePage';
import Signup from './components/signUpPage';
import AddBloodSugar from './components/addBloodSugar';
import ProfilePage from './components/profilePage';
import AddMedicinePageScreen from './components/addMedicinePageScreen';
import AddCareGiverPage from './components/addCareGiverPage';
import NotificationsPage from './components/notificationsPage';
import MedicinesPage from './components/medicinesPage/MedicinesPage';
import AddThings from './components/addThings';
import InvivtationsPage from './components/invitationsPage/InvivtationsPage';
import AddMeeting from './components/addMeeting';
import AddActivityPageScreen from './components/addActivityPageScreen';
import ReportPage from './components/reportPage/report';
import SendSMS from 'react-native-sms';
// import dailyScheduler from './components/dailySchedulerPage/dailyScheduler';
LogBox.ignoreAllLogs();//Ignore all log notifications
const Stack = createNativeStackNavigator();

const MedicinesPageStack = createNativeStackNavigator();
function MedicinesPageStackScreen() {
    const MedicinesPageRoutes = [
        { name: 'MedicinesPage', component: MedicinesPage, options: { headerShown: false } },
        { name: 'AddMedicinePageScreen', component: AddMedicinePageScreen, options: { headerShown: false } },
        { name: 'AddActivityPageScreen', component: AddActivityPageScreen, options: { headerShown: false } },
        { name: 'AddBloodSugar', component: AddBloodSugar, options: { headerShown: false } },
    ]
    return (
        <MedicinesPageStack.Navigator >
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

const ThingsPageStack = createNativeStackNavigator();
function ThingsPageStackScreen() {
    const ThingsPageRoutes = [
        { name: 'AddThings', component: AddThings, options: { headerShown: false } },
        { name: 'AddCareGiverPage', component: AddCareGiverPage, options: { headerShown: false } },
        { name: 'AddMeetingPage', component: AddMeeting, options: { headerShown: false } },
    ]
    return (
        <ThingsPageStack.Navigator >
            {ThingsPageRoutes.map(route => {
                const { name, component, options } = route;
                return (
                    <ThingsPageStack.Screen
                        key={name}
                        name={name}
                        component={component}
                        options={options}
                    />
                );
            })}
        </ThingsPageStack.Navigator>
    );
}

const ProfilePageStack = createNativeStackNavigator();
function ProfilePageStackScreen() {
    const ProfilePageRoutes = [
        { name: 'ProfilePage', component: ProfilePage, options: { headerShown: false } },
        { name: 'InvitationsPage', component: InvivtationsPage, options: { title: 'See Invitations' } },
    ]
    return (
        <ProfilePageStack.Navigator>
            {ProfilePageRoutes.map(route => {
                const { name, component, options } = route;
                return (
                    <ProfilePageStack.Screen
                        key={name}
                        name={name}
                        component={component}
                        options={options}
                    />
                );
            })}
        </ProfilePageStack.Navigator>
    );
}
const HomePageStack = createNativeStackNavigator();
function HomeStackScreen() {
    const routes = [
        { name: 'HomePage', component: HomePage, options: { headerShown: false } },
        { name: 'NotificationsPage', component: NotificationsPage, options: { title: 'NotificationsPage' } },
        { name: 'ReportPage', component: ReportPage, options: { title: 'Weekly Report' } },
    ]
    return (
        <HomePageStack.Navigator>
            {routes.map(route => {
                const { name, component, options } = route;
                return (
                    <HomePageStack.Screen
                        key={name}
                        name={name}
                        component={component}
                        options={options}
                    />
                );
            })}
        </HomePageStack.Navigator>
    );
}

const getLocation = () => {
    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            resolve([latitude, longitude]);
        },
            error => {
                console.log(error);
            },
            { timeout: 10000 })
    })
};


const sendSMS = async () => {
    const [lat, long] = await getLocation();
    const locationLink = 'https://maps.google.com/?q=' + lat + "," + long;
    console.log(locationLink);
    SendSMS.send({
        body: locationLink,
        recipients: ['+905362242845', '+9053654428455'],
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission: true
    }, (completed, cancelled, error) => {

        console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);

    });
};

const Tab = createBottomTabNavigator();
function HomeTabScreen() {
    const unused = [
        { name: 'Login', component: Login, options: { title: 'Login' } },
        { name: 'Signup', component: Signup, options: { title: 'Signup' } },
        { name: 'AddCareGiverPage', component: AddCareGiverPage, options: { title: 'Add Care Giver' } },
        { name: 'InvitationsPage', component: InvivtationsPage, options: { title: 'See Invivtations' } },
    ]
    const routes = [
        { name: 'HomePageStack', component: HomeStackScreen, options: { title: 'Home' } },
        { name: 'AddThingsStack', component: ThingsPageStackScreen, options: { title: 'Add' } },
        { name: 'MedicinesPageStack', component: MedicinesPageStackScreen, options: { title: 'Medicines' } },
        { name: 'ProfilePageStack', component: ProfilePageStackScreen, options: { title: 'Profile' } },
        { name: 'ReportPageStack', component: ReportPage, options: { title: 'Reports' } },
        // { name: 'DailySchedulePage', component: dailyScheduler, options: { title: 'Daily Scheduler' } },
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
                        options={{
                            ...options,
                            headerShown: true, headerRight: () => (
                                <TouchableOpacity
                                    style={styles.emergencyButton}
                                    onPress={() => sendSMS()}>
                                    <View style={styles.emergencyButtonContentWrapper}>
                                        <Image style={styles.emergencyButtonIcon} source={require('../img/emergency-call.png')} />
                                        <Text style={styles.emergencyButtonText}>
                                            Emergency Button
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                );
            })}
        </Tab.Navigator>
    );
}

const App = () => {
    let routes = [
        { name: 'Login', component: Login, options: { headerShown: false } },
        { name: 'HomeStack', component: HomeTabScreen, options: { headerShown: false } },
        { name: 'Signup', component: Signup, options: { headerShown: false } }
    ]
    return (
        <NavigationContainer>
            {console.displayYellowBox = true}
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

const styles = StyleSheet.create({
    emergencyButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeaaaf',
        borderRadius: 17,
        width: '80%',
        height: '80%',
        padding: 10,
    },
    emergencyButtonText: {
        fontSize: 15,
        fontWeight: '800',
        color: '#fff',
        textAlign: 'center',
        marginLeft: 10
    },
    emergencyButtonIcon: {
        width: 35,
        height: 35,
    },
    emergencyButtonContentWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }

    /*
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    }*/
});

export default App;