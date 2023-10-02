import React, { useContext, useEffect } from 'react';
import { ThemeContext } from 'styled-components/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { ChannelList, Profile , Home , BoardList} from '../screens';
import { MaterialIcons } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Text,View } from '../components';

const TabIcon = ({ name, focused }) => {
    const theme = useContext(ThemeContext);
    return(
        <MaterialIcons
        name={name}
        size={47}
        color={focused ? theme.tabBtnActive : theme.tabBtnInactive }
        />
    );
};

const _Tab = createBottomTabNavigator();

const Tab = ({ route, navigation }) => {
    useEffect(() => {
       const screenName = getFocusedRouteNameFromRoute(route) || 'List';
       navigation.setOptions({
        headerTitle : screenName,
        headerRight: () =>
            screenName == 'List' && (
                <MaterialIcons
                name="add"
                size={25}
                style={{ margin : 10}}
                onPress={() => navigation.navigate('ChannelCreation')}
                />
            )
       });
    });

    logoTitle = () => {
        return (
                <AntDesign 
                name="down" 
                size={28} 
                color="black" />
        );
      };

    return(
        <_Tab.Navigator screenOptions = {{ headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor:'white', height:80}
         }}>
            <_Tab.Screen 
            name="List" 
            component={ChannelList}
            options={{
                tabBarIcon: ({ focused }) => 
                    TabIcon({
                        name: focused ? 'center-focus-strong' : 'center-focus-weak',
                        focused,
                    }),
            }}
            />
            <_Tab.Screen 
            name="Location" 
            component={ChannelList}
            options={{
                tabBarIcon: ({ focused }) => 
                    TabIcon({
                        name: focused ? 'location-on' : 'not-listed-location',
                        focused,
                    }),
            }}
            />
            <_Tab.Screen 
            name="Home" 
            component={Home}
            options={{
                tabBarIcon: ({ focused }) => 
                    TabIcon({
                        name: focused ? 'home' : 'home',
                        focused,
                    }),
                
            }}
            />
            <_Tab.Screen 
            name="Search" 
            component={BoardList}
            options={{
                tabBarIcon: ({ focused }) => 
                    TabIcon({
                        name: focused ? 'saved-search' : 'search',
                        focused,
                    }),
                title : '조치원읍',
                headerShown : true,
                headerStyle:{
                    backgroundColor:'#94B8FF',
                    height:94,
                },
                fontWeight: 'bold',
                // headerRight:() => (
                //     <AntDesign name="down" size={24} color="black" />
                // ),
                
            }}
            />
            <_Tab.Screen 
            name="Profile" 
            component={Profile}
            options={{
                tabBarIcon: ({ focused }) => 
                    TabIcon({
                        name: focused ? 'person' : 'person-outline',
                        focused,
                    }),
            }}
            />
        </_Tab.Navigator>
    )
};

export default Tab;