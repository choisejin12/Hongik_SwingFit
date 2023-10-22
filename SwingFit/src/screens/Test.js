import React, { useState,useContext } from 'react';
import {TestImage,CustomSwitch} from '../components';
import {View,TouchableOpacity,Text,StyleSheet} from 'react-native';
import { ProgressContext,LoadingContext} from '../contexts';
import {updateUserPosture} from '../firebase';


const styles = StyleSheet.create(
    {
        Container:{
            display:'flex',
            
        },
        ImageBox:{
            display:'flex',
            width:359,
            height:167,
            alignItems:'flex-start',
            marginLeft:30,
            justifyContent:'center',
            paddingLeft:20,
            borderTopColor:'#B5B5B5',
            borderTopWidth:1.5,
            borderBottomColor:'#B5B5B5',
            borderBottomWidth:1.5,
            marginTop:90,
            // position:'absolute',
            // top:70,
        },
        DisImageBox:{
            border:'none',
            marginTop:30,
            marginLeft:30,
        },

        DisImageText:{
            display:'none'
        },
        photoText:{
            width:330,
        },
        Button:{
            position:'absolute',
            top:633,
            marginTop:50,
            display:'flex',
            width:'100%',
            height:77,
            backgroundColor:'#6D9FFF',
            alignItems:'center',
            justifyContent:'center',
        },
        testBox:{
            marginTop:70,
            // display:'flex',
            // position:'relative',
            // top:300,

        },
        postureBox:{
            marginTop:10,
            marginBottom:20,
            marginLeft:30,
        },

        testbuttonBox:{
            flexDirection:'row',
            marginTop:10,
        },
        testbutton:{
            width:84,
            height:29,
            borderWidth:1,
            borderColor:'#B4B4B4',
            borderRadius:10,
            textAlign:'center',
            lineHeight:27,
            marginRight:20,
            color:'#B4B4B4',

        },

    }
)


const Test = ({navigation}) => {
    const LOGO = 'https://firebasestorage.googleapis.com/v0/b/swingfit-a15ef.appspot.com/o/loading_1.png?alt=media';
    const [photo,setPhoto] = useState('');
    const { spinner } = useContext(ProgressContext);
    const { loading } = useContext(LoadingContext);
    const [inable,setInable] = useState(false);

    const _handlePhotoChange = async url => {
        try {
            spinner.start();
          const photoURL = await updateUserPosture(url);
          setPhoto(photoURL);
          setInable(true);
        } catch (e) {
          Alert.alert('Photo Error', e.message);
        } finally {
            spinner.stop();
        }
      };

      const _handleButtonPress = () =>{
        try{
            //loading.start();
            navigation.navigate('Diagnosis');
        }catch (e) {
            Alert.alert('Photo Error', e.message);
          } finally {
            //loading.stop();
          }
      }



      
    return(
        <View style={styles.Container}>
            <View style={inable ? styles.DisImageBox : styles.ImageBox}  >
                <TestImage url={photo} onChangePhoto={_handlePhotoChange} toggle={inable} styles={inable ? {width:300,height:300} : {} } />
                <View style={inable ? styles.DisImageText : styles.photoText}>
                    <Text style={{color:'#929292', marginBottom:10}}>갤러리에 저장한 스윙을 진단받아보세요.</Text>
                    <Text style={{color:'#676767'}}>정확한 진단을 위해 선택 영상의 상태에 해당하는 내용을 선택해주세요!</Text>
                </View>
               
            </View>

            <View style={styles.testBox}>
                <View style={styles.postureBox}>
                    <Text>스윙 자세</Text>
                    <View style={styles.testbuttonBox}>
                        <CustomSwitch
                        selectionMode={1}
                        roundCorner={true}
                        option1={'정면 스윙'}
                        option2={'측면 스윙'}               
                        selectionColor={'black'}
                        />

                        
                    </View>
                    
                </View>

                <View style={styles.postureBox}>
                    <Text>사용 클럽</Text>
                    <View style={styles.testbuttonBox}>
                        <CustomSwitch
                        selectionMode={2}
                        roundCorner={true}
                        option1={'아이언'}
                        option2={'드라이버'}
                        selectionColor={'black'}
                        />                                   
                    </View>
                </View>
                
            </View>
            <TouchableOpacity onPress={_handleButtonPress} style={styles.Button}>
                <Text style={{fontSize:26,fontWeight:'bold',color:'white'}}>진단하기</Text>
            </TouchableOpacity>
            
        </View>
    );
};

export default Test;