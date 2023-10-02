import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from 'styled-components/native';
import {Channel, ChannelCreation} from '../screens';
import Tab from './Tab';

const Stack = createStackNavigator();

const Main = () => {
    const theme = useContext(ThemeContext)
    return (
    <Stack.Navigator
        screenOptions={{
        headerShown:false,
        headerTintColor: theme.text,
        headerBackTitleVisible: false,
        cardStyle: { backgroudColor : theme.background },
    }}
    >
        <Stack.Screen name="Tab" component={Tab}/>
        {/* <Stack.Screen name="ChannelCreation" component={ChannelCreation}/>
        <Stack.Screen name="Channel" component={Channel}/> */}
        
    </Stack.Navigator>
    );
};

export default Main;