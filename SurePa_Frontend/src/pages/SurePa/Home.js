
import React from 'react';
import { Text, View } from 'react-native';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
import { NativeRouter, Route, Link, Router, Routes } from "react-router-native";
import Login from '../../components/loginPage';

const Home = () => {
    const routes = [
        { path: '/', component: <Login /> }
    ]
    return (
        <NativeRouter>
            <View>
                <Routes>
                    {routes.map(route => {
                    const { path, component } = route;
                    console.log(path,component);
                    console.log('patates');
                    return (
                        <Route exact
                            key={path}
                            path={path}
                            element={component}
                        />
                    );
                })}
                    {/* <Route path='/' element={<Login />}></Route> */}
                </Routes>
            </View>
        </NativeRouter>
    )
};

export default Home;