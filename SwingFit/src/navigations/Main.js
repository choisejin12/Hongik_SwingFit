import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from 'styled-components/native';
import {BoardCreation,Board,Diagnosis} from '../screens';
import Tab from './Tab';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native'

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
        <Stack.Screen name="BoardCreation" component={BoardCreation} 
        options={
            { headerShown: true, 
                title:'글쓰기',
                headerTitleAlign: 'center',
                headerStyle:{
                    borderBottomColor: '#8E8E8E',
                    borderBottomWidth: 2,
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                  },
                  headerLeft: ({onPress}) => (
                    <TouchableOpacity onPress={onPress}>
                      <AntDesign name="close" size={24} color="black" style={{ marginLeft: 20}} />
                    </TouchableOpacity>
                  ),
        }
            } />
            <Stack.Screen 
            name="Board" 
            component={Board}
            options={
                { 
                    title:'조치원읍',
                    headerShown : true,
                    headerStyle:{
                        backgroundColor:'#94B8FF',
                        height:94,
                    },
                    fontWeight: 'bold',
                    headerLeft: () => (
                        ''
                    )
            }
                }
            />

            <Stack.Screen name="Diagnosis" component={Diagnosis}
            options={
                { 
                    title:' ',
                    headerShown : true,
                    headerStyle:{
                        backgroundColor:'white',
                        height:54,
                    },
                    fontWeight: 'bold',
                    headerLeft: ({onPress}) => (
                        <TouchableOpacity onPress={onPress}>
                            <FontAwesome name="chevron-left" size={24} color="black" marginLeft={20} />
                        </TouchableOpacity>
                    ),
                    headerRight: ({onPress}) => (
                        <TouchableOpacity onPress={onPress}>
                            <Ionicons name="share-social-sharp" size={27} color="black" marginRight={20} />
                        </TouchableOpacity>
                    )
            }
                }
            />
        {/* <Stack.Screen name="ChannelCreation" component={ChannelCreation}/>
        <Stack.Screen name="Channel" component={Channel}/> */}
        
    </Stack.Navigator>
    );
};

export default Main;