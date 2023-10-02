import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import {ThemeContext} from 'styled-components/native';
import {Button} from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {StyleSheet,Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import {Text} from 'react-native';

const Container = styled.View`
    flex:1;
    justify-content:center;
    align-items: center;
    background-color: ${({theme}) => theme.background};
    padding: 0 20px;
    padding-top: ${({insets:{top}}) => top}px;
    padding-bottom: ${({insets:{bottom}}) => bottom}px;
`;

const StyledText = styled.Text`
    position: absolute;
    top:220px;
    left:50px;
    margin-top: 30px;
    width: 258px;
    font-size : 40px;
    text-align: left;
    color : #111111;
    font-weight: 700;
`;
const StyledTextDesc = styled.Text`
    position: absolute;
    bottom:205px; 
    left:240px;
    margin-top: 10px;
    font-size : 14px;
    color : #111111;
`;

const StyledButton = styled.Text`
    position: relative;
    margin-top: 30px;
    top:-35px;
    left:30px;
    width: 206px;
    height: 36px;
    font-size : 16px;
    border: 1px solid black;
    text-align: center;
    border-radius: 20px;
    line-height: 35px;
    color : #111111;
`;

const styles = StyleSheet.create({
    image: {
    position:'absolute',
    top:130,
    left:55,
    width: 87,
    height: 100,
    },
  });


const LOGO = 'https://firebasestorage.googleapis.com/v0/b/swingfit-a15ef.appspot.com/o/Signmain.png?alt=media';


const SignMain = ({navigation}) => {
    const insets = useSafeAreaInsets();//휴대폰 창 크기
    const theme = useContext(ThemeContext);// theme 이용
    const [toggle,setToggle] = useState(false);
    //return
    return (
        <Container insets={insets}>
            <Image source={{uri:LOGO}} style={styles.image}/>
            <StyledText>환영합니다.              <Text style={{color:"#000AFF"}}>스윙핏</Text>입니다</StyledText>
            <StyledButton>
                스윙핏을 소개합니다.
                <Entypo name="chevron-right" size={18} color='black'/>
            </StyledButton>
            <Button 
            title="카카오톡으로 시작하기" 
            onPress={() => navigation.replace('')} 
            containerStyle={{ 
                marginTop: 30 , 
                backgroundColor: 'white' ,
                width:295,
                height: 64 , 
                position:'absolute',
                top:-40, 
                left:-150,
                borderColor: 'black',
                borderStyle: 'solid',
                borderWidth: 1,
                borderRadius:10,
            }}
            textStyle={{color:"black", fontSize:21}}
            />
            <Button 
            title="로그인하기" 
            onPress={() => {
                setToggle(true);
                navigation.replace('Signin');
            }} 
            containerStyle={{ 
                marginTop: 30 , 
                backgroundColor: toggle ? 'black' : 'white',
                width:295, 
                height: 64 , 
                position:'absolute',
                top:55, 
                left:-150,
                borderColor: 'black',
                borderStyle: 'solid',
                borderWidth: 1,
                borderRadius:10,
            }}
            textStyle={{color: toggle ? 'white' : 'black', fontSize:21}}
            />
            <StyledTextDesc onPress={() => {navigation.navigate('SignUp')}}>회원가입하러가기</StyledTextDesc>
        </Container>
    );
};

export default SignMain;