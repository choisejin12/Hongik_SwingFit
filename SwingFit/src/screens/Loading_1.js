import React, { useContext } from 'react';
import styled from 'styled-components/native';
import {ThemeContext} from 'styled-components/native';
import {Button} from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {StyleSheet,Image } from 'react-native';


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
    width: 258px;
    font-size : 30px;
    text-align: center;
    color : #111111;
    font-weight: 700;
    
`;

const StyledTextDesc = styled.Text`
    margin-top: 10px;
    font-size : 14px;
    color : #ABABAB;
`;

const styles = StyleSheet.create({
    image: {
      width: 180,
      height: 140,
    },
  });





const LOGO = 'https://firebasestorage.googleapis.com/v0/b/swingfit-a15ef.appspot.com/o/loading_1.png?alt=media';


const Loading_1 = ({navigation}) => {
    const insets = useSafeAreaInsets();//휴대폰 창 크기
    const theme = useContext(ThemeContext);// theme 이용
    
    //return
    return (
        <Container insets={insets}>
            <Image source={{uri:LOGO}} style={styles.image}/>
            <StyledText>골프가                             너무 어려우신가요</StyledText>
            <StyledTextDesc>내 마음대로 안되는 골프, 자꾸만 흐트러지는 내 자세</StyledTextDesc>
            <Button 
            title="다음" 
            onPress={() => navigation.replace('Loading_2')} 
            containerStyle={{ marginTop: 30 , backgroundColor: 'black' , height: 67 }}
            textStyle={{color:"white", fontSize:30, fontWeight: 'bold'}}
            />
        </Container>
    );
};

export default Loading_1;