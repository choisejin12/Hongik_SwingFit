import React ,{useState,useContext}from 'react';
import { StyleSheet,View ,TextInput,Text,TouchableOpacity} from 'react-native';
import { Image } from '../components';
import {Picker} from '@react-native-picker/picker';
import {createBoard,createUserBoardImg} from '../firebase';
import {ProgressContext } from '../contexts';

const stlyes = StyleSheet.create({
    Category : {
        width:'100%',
        height:66,
        borderBottomColor:'#8E8E8E',
        borderBottomWidth:2,
        backgroundColor:'white',
    },
    categorytext:{
        marginTop:5,
    },
    inputContainer:{
        backgroundColor:'white',
        padding:30,
        overflow:'auto',
    },
    inputTitle:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:10,
    },
    inputDesc:{
        width:'100%',
        fontSize:16,
        textAlignVertical: 'top',
        height:390,
    },
    submitContainer:{
        width:"100%",
        height:92,
        backgroundColor:'E9E9E9',
        justifyContent:'center',
        alignItems:'center',

    }
  });





const BoardCreation = ({navigation}) => {
    const { spinner } = useContext(ProgressContext);
    const [photo,setphoto] = useState(DEFAULT_PHOTO); 
    const [category,setCategory] = useState();
    const [title,setTitle] = useState();
    const [Desc,setDesc] = useState();

    const DEFAULT_PHOTO = 'https://firebasestorage.googleapis.com/v0/b/swingfit-a15ef.appspot.com/o/main_profile.png?alt=media';

  
    const _handleTitleChange = title => { 
        setTitle(title);
    };

    const _handleDescChange = Desc => { 
        setDesc(Desc);
    };

    const _handleBoardSend = async() => {
        try {
            spinner.start();
            await createBoard({ title,Desc,category,photo});
            navigation.pop();
          } catch (e) {
            Alert.alert('Message Error', e.message);
          }finally{
            spinner.stop();
        }
    }

    const _handlePhotoChange = async url => {
        try {
            spinner.start();
            const photoURL = await createUserBoardImg(url);
            setphoto(photoURL);
        } catch (e) {
          Alert.alert('Photo Error', e.message);
        } finally {
            spinner.stop();
        }
      };



 
    return(
        <View>
            <View style={stlyes.Category}>
                <View style={stlyes.categorytext}>
                    <Picker
                    selectedValue={category}
                    onValueChange={(val, idx) => setCategory(val)}>
                        <Picker.Item label="질문있어요" value={'질문있어요'} />
                        <Picker.Item label="취미생활" value={'취미생활'} />
                        <Picker.Item label="같이해요" value={'같이해요'} />
                        <Picker.Item label="동네사진전" value={'동네사진전'} />
                        <Picker.Item label="일상" value={'일상'} />
                    </Picker>
                </View>
            </View>

            <View style={stlyes.inputContainer}>
                <Image showButton={true} url={photo} onChangePhoto={_handlePhotoChange}/>
                <TextInput 
                style={stlyes.inputTitle} 
                placeholder='제목을 입력해주세요.'
                value={title}
                onChangeText={_handleTitleChange}
                />
                <TextInput style={stlyes.inputDesc} 
                multiline = {true} 
                numberOfLines = {4} 
                value={Desc}
                onChangeText={_handleDescChange}
                placeholder='가까이 사는 동네 이웃들과 함께 소통해보세요! 또한 궁금한 것도 물어보세요. 친절하게 진짜 정보를 알려줄거에요.'/>
            </View>



            <TouchableOpacity style={stlyes.submitContainer} onPress={_handleBoardSend}>
                <View>
                    <Text style={{fontSize:30,fontWeight:'bold'}}>완료</Text>
                </View>
            </TouchableOpacity>
        </View>
           

            
             
    );
};

export default BoardCreation;