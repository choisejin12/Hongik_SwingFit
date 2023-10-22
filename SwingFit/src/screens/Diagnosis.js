import React , {useState,useEffect,useCallback} from 'react';
import {View,TouchableOpacity,Text,StyleSheet,} from 'react-native';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Loading,Image} from '../components';
import { getPostureImg } from '../firebase';
import YoutubePlayer from "react-native-youtube-iframe";

const ShareBox = styled.Text`
       position:fixed;
       background-color:#0B1144;
       width:180px;
       padding:10px;
       border-radius:10px;
       left:220px;
       top:10px;
`

const styles = StyleSheet.create(
    {
        Container:{
            backgroundColor:'white',
            height:'100%',
        },
        ScoreBox:{
            marginLeft:30,

        },
        ScoreDesc:{
            backgroundColor:'#EBEBEB',
            width:180,
            padding:9,
            borderRadius:10,
         

        },
        DiagnosisBox:{
            marginTop:30,

        },
        DiagnosisDesc:{
            backgroundColor:'#131313',
            width:94,
            padding:7,
            alignItems:'center',
            marginLeft:25
            
        },
        DiagnosisImg:{
            width:'100%',
            height:600,
        },
        styleProfileProblemDiv:
        {
            borderBottomColor:'#CBCBCB',
            borderBottomWidth:2,
            marginBottom:20,

        },
        styleProfileProblem:
        {
            backgroundColor: "rgba(255, 107, 107, 0.45)",
            width:55,
            fontSize:10,
            textAlign:'center',
            padding:2,
            color:"#FA6E6E",
            borderRadius:20,
            fontWeight:'bold',
            marginBottom:5,

        },
        styleProfileProblemTitle:
        {
            fontWeight:'bold',
            marginTop:5,    
            marginBottom:10
        },
        styleProfileProblemDesc:
        {
            color:'#5D5D5D',
            width:'90%',
            fontSize:11,
            marginTop:5,
            marginBottom:25
        },
        ContentBox:{
            marginLeft:30
        },
        styleProfileTip:{
            backgroundColor: '#DAF4E5',
            width:55,
            fontSize:10,
            textAlign:'center',
            padding:2,
            color:"#83D2A4",
            borderRadius:20,
            fontWeight:'bold',
            marginBottom:5,
        },
        YoutubeBox:{
            backgroundColor:'#F4F4F4',
            
            width:'100%',
            height:200
        }
        
    }
);


const Diagnosis = ({navigation}) => {
    const [photo,setPhoto] = useState('');

    useEffect(() => {
        async function fetchAndSetUser() { 1
            const url = await getPostureImg();
            setPhoto(url);
           }
           fetchAndSetUser(); 
    },[]);

   



    return(
        <KeyboardAwareScrollView keyboardShouldPersistTaps="always" extraScrollHeigh={20} >
            <View style={styles.Container}>
                
                <ShareBox>
                    <Text style={{color:'white'}}>나의 스윙을 공유해보세요!</Text>
                </ShareBox>

            <View style={styles.ScoreBox}>
                    <Text style={{fontWeight:'bold', fontSize:14}}>나의 스윙 점수</Text>
                    <Text style={{fontWeight:'bold',fontSize:19,color:'#959595'}}><Text style={{fontSize:48,color:'#30B465'}}>6.7</Text>/10</Text>
                    <View style={styles.ScoreDesc}>
                        <Text style={{color:'#7F7F7F'}}>사진을 보고 확인해주세요.</Text>
                    </View>
                </View>

                <View style={styles.DiagnosisBox}>
                    <View style={styles.DiagnosisDesc}>
                        <Text style={{color:'white',fontSize:15}}>
                                대표진단
                        </Text>
                    </View>

                    <View style={styles.DiagnosisImg}>
                        <Image url={photo} styles={{position:'relative',width:'100%',height:'100%',objectFit:'contain',backgroundColor:'white'}}/>
                    </View>
                </View>

                <View style={styles.ContentBox}>
                    <View style={styles.styleProfileProblemDiv}>
                        <Text style={styles.styleProfileProblem} >아쉬워요</Text>
                        <Text style={styles.styleProfileProblemTitle}>어드레스 주저 앉음</Text>
                        <Text style={styles.styleProfileProblemDesc}>어드레스 시 힙이 아래로 내려가 있습니다. 백스윙 궤도에 일관성이 떨어지며 임팩트의 일관성이 떨어질 확률이 높습니다.</Text>

                        <Text style={styles.styleProfileTip} >꿀팁</Text>
                        <Text style={styles.styleProfileProblemDesc}>오리궁댕이 자세로 어드레스 해보세요!</Text>

                    </View>

                    <View style={styles.styleProfileProblemDiv}>
                        <Text style={styles.styleProfileProblem} >아쉬워요</Text>
                        <Text style={styles.styleProfileProblemTitle}>탑 하체 무너짐</Text>
                        <Text style={styles.styleProfileProblemDesc}>백스윙 탑에서 오른쪽 다리가 펴져 하체가 유지 되지 않습니다. 임팩트의 정확도가 떨어지고 슬라이스, 훅을 유발합니다.</Text>
                        
                        <Text style={styles.styleProfileTip} >꿀팁</Text>
                        <Text style={styles.styleProfileProblemDesc}>볼을 끝까지 쳐다보고 따라가보세요!</Text>
                    </View>
                </View>
                <View style={styles.YoutubeBox}>
                        
                        <Text style={{fontWeight:'bold',padding:20,fontSize:15}}>해당 영상을 참고해보세요. </Text>
                        <Image url={'https://firebasestorage.googleapis.com/v0/b/swingfit-a15ef.appspot.com/o/youtube.png?alt=media'} 
                        styles={{
                            width:'100%',
                            height:'100%',

                        }}/>
                    </View>
            </View>
            
        </KeyboardAwareScrollView>
    );
};

export default Diagnosis;