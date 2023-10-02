import React, {useContext}from 'react';
import {ThemeContext} from 'styled-components/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SignUp, Signin, SignMain} from '../screens';
import {MaterialIcons} from '@expo/vector-icons';

const Stack = createStackNavigator();

const Auth = () => {
    const theme = useContext(ThemeContext);
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="SignMain" 
            component={SignMain}
            options={{headerShown: false}}
            />
            <Stack.Screen 
            name="Signin" 
            component={Signin}
            options={{headerShown: false}}
            />
            <Stack.Screen 
            name="SignUp" 
            component={SignUp}
            options={{
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
                headerTintColor: theme.text,
                headerLeft:({onPress, tintColor}) => (
                    <MaterialIcons
                    name="keyboard-arrow-left"
                    size={38}
                    color={tintColor}
                    onPress={onPress}
                    />
                ),
            }}
            />
        </Stack.Navigator>
    );
};

export default Auth;