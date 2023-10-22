import React from 'react';
import styled from 'styled-components/native';
import { getCurrentUser } from '../firebase';
import { Text,View,StyleSheet,TouchableOpacity  } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Image } from '../components';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const StyledText = styled.Text`
    position:absolute;
    top:-30px;
    width: 200px;
    font-size : 36px;
    text-align: center;
    color : #111111;
    font-weight: 700;
    margin-left: 30px;
    margin-top: 110px;
`;

const styles = StyleSheet.create({
    Container_top:
    {
        width: "100%", height: 490, backgroundColor:"white", justifyContent:'space-around'
    },
    Container_bottom:
    {
        position:'absolute',
        bottom:0,
        width: "100%", height: 270,backgroundColor:"rgba(48, 180, 101, 0.45)"
    },
    Home_Information:
    {
        position:'absolute',
        top: 240,
        width: 353, height: 130, backgroundColor:"white", marginLeft:30,flexDirection:'row', overflow:'hidden',
        borderRadius:40, 
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 17,
    },
    Home_Information_Left:
    {
        width:148, height: 130, backgroundColor:'#4ABE78',
    },
    Home_Information_Right:
    {
        width:'100%',height: 130, backgroundColor:'white', paddingTop: 40, paddingLeft: 10,
    },
    Home_mypage:
    {
        position:'relative',
        top:-90,
        left:80,
        width: 252, 
        height: 281,
        zIndex:10,
        backgroundColor:"white",
        borderRadius:40, 
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 11.14,
        elevation: 8,
    },
    Home_mypageTop:
    {
        position:'relative',
        left:70,
        top:25,
    },

    Home_mypageBottom:
    {
        marginTop: 7,
        position:'relative',
        marginLeft:25,

    },
    Home_mypageText:
    {
        marginLeft:10,
        fontWeight:'bold',
    }

});

const Home = ({navigation}) => {
const user = getCurrentUser();

  return (
    <>
    <View style={styles.Container_top}>
        <StyledText>
            안녕하세요.              
        </StyledText>
        <Text style={{position:'absolute',top:130,fontSize:36,fontWeight:'bold',left:40}}><Text style={{color:"#30B465",}}>{user.name}</Text> 회원님!</Text>
        <TouchableOpacity style={styles.Home_Information} onPress={() => {navigation.navigate('Test')}}>
            <View style={styles.Home_Information_Left}>
                 <FontAwesome name="arrow-right" size={65} color="white" marginLeft={50} marginTop={26} />
            </View>
            <View style={styles.Home_Information_Right}>
                <Text style={{color:"black", fontWeight:600, }}>당신의</Text>
                <Text  style={{fontWeight:600,}}><Text style={{color:"#0075FF", fontSize:16, }}>자세</Text>를 <Text style={{color:"#0075FF",  fontSize:16}}>확인</Text>하고 싶으신가요?</Text>
                <Text style={{color:"black", opacity:0.5, fontSize:9, paddingLeft:10,paddingTop:5}}>지금 바로 확인하고 교정하러 가보세요!</Text>
            </View>
        </TouchableOpacity> 

    </View>
    <TouchableOpacity  style={styles.Home_mypage} onPress={() => {navigation.navigate('Profile')}}>
        <View  style={styles.Home_mypageTop}>
          <Image url={user.photo} styles={{borderRadius:60}}/>
          <Text style={{color:"black", fontWeight:600, position:'relative',top:-30}}> <Text style={{color:"#0075FF", fontSize:27, }}>{user.name}</Text> 골퍼</Text>
        </View>
    
        <View style={styles.Home_mypageBottom}>
            <View style={{flexDirection:'row'}}>
                <Octicons name="graph" size={24} color="black" marginBottom={10}/>
                <Text style={styles.Home_mypageText}>스윙 평균 점수</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <FontAwesome5 name="award" size={24} color="black" marginBottom={10}/>
                <Text style={{ marginLeft:16,fontWeight:'bold'}}>스윙 최고 점수</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <MaterialIcons name="mood-bad" size={24} color="black" />
                <Text style={styles.Home_mypageText}>나의 문제점</Text>
            </View>
        </View>
    </TouchableOpacity > 

    <View style={styles.Container_bottom}>

    </View>
    </>
  );
};

export default Home;