import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from 'styled-components/native';
import { Loading_1, Loading_2} from '../screens';


const Stack = createStackNavigator();

const Main = () => {
    const theme = useContext(ThemeContext);

    return (
    <Stack.Navigator
        screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: theme.text,
        headerBackTitleVisible: false,
        cardStyle: { backgroudColor : theme.background },
    }}
    >
        <Stack.Screen name="Loading_1" component={Loading_1} options={{headerShown: false}} />
        <Stack.Screen name="Loading_2" component={Loading_2} options={{headerShown: false}} />
    </Stack.Navigator>
    );
};

export default Main;