
import React from 'react';
import { View } from 'react-native';
import { NativeRouter, Route, Routes } from "react-router-native";
import Login from '../../components/loginPage';
import Main from '../../components/mainPage';

const Home = () => {
    const routes = [
        { path: '/', component: <Login /> },
        { path: '/main', component: <Main /> }
    ]
    return (
        <NativeRouter>
            <View>
                <Routes>
                    {routes.map(route => {
                        const { path, component } = route;
                        return (
                            <Route exact
                                key={path}
                                path={path}
                                element={component}
                            />
                        );
                    })}
                </Routes>
            </View>
        </NativeRouter>
    )
};

export default Home;