import React, { useContext } from 'react';
import styled from 'styled-components/native';
import {ThemeContext} from 'styled-components/native';
import {Button} from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {StyleSheet,Image } from 'react-native';
import { StartContext } from '../contexts';

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
    margin-top: 30px;
    width: 338px;
    font-size : 30px;
    text-align: center;
    color : #111111;
    font-weight: bold;
    
`;

const StyledTextDesc = styled.Text`
    width: 264px;
    margin-top: 10px;
    font-size : 14px;
    text-align: center;
    color : #ABABAB;
`;

const styles = StyleSheet.create({
    image: {
      width: 180,
      height: 140,
    },
  });

const LOGO = 'https://firebasestorage.googleapis.com/v0/b/swingfit-a15ef.appspot.com/o/loading_2.png?alt=media';


const _handleStartBtnPress = async() => { 
    try{
        
    }catch(e){
        Alert.alert('Start Error', e.message);
    }
};


const Loading_2 = ({navigation}) => {
    const insets = useSafeAreaInsets();//휴대폰 창 크기
    const theme = useContext(ThemeContext);// theme 이용
    const { controls } = useContext(StartContext);
    
    const _handleStartBtnPress = async() => { 
        try{
            controls.stop();
        }catch(e){
            Alert.alert('Start Error', e.message);
        }
    };


    //return
    return (
        <Container insets={insets}>
            <Image source={{uri:LOGO}} style={styles.image}/>
            <StyledText>AI가 손쉽게                      당신의 자세를 진단해요</StyledText>
            <StyledTextDesc>정확하고 , 간단하게 당신의 문제점을            파악하고 교정해드려요. </StyledTextDesc>
            <Button 
            title="시작하기" 
            onPress={_handleStartBtnPress}
            containerStyle={{ marginTop: 30 , backgroundColor: 'black' , height: 67, }}
            textStyle={{color:"white", fontSize:30, fontWeight: 'bold'}}
            />
        </Container>
    );
};

export default Loading_2;