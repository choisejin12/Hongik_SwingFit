import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import {View,Text,StyleSheet,TouchableOpacity,TextInput,FlatList} from 'react-native';
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Image } from '../components';
import { getCurrentUser, app, updateUserInfo ,createComent , getImg} from '../firebase';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
import { AntDesign,Ionicons } from '@expo/vector-icons';
import {
    getFirestore,
    collection,
    onSnapshot,
    query,
    doc,
    orderBy,
  } from 'firebase/firestore';


const Container = styled.View`
    padding: 30px;
`;

const ItemCategory = styled.Text`
    width: 69px;
    padding: 3px;
    text-align: center;
    font-size: 10px;
    height: 21px;
    border-radius: 7px;
    background-color: #E6E6E6;
    margin-bottom: 10px;
`;

const styles = StyleSheet.create({
    BoardProfileContainer:{
        flexDirection:'row',
    },
    BoardTitle:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:20,
    },
    BoardDesc:{
        marginBottom:20,
       
    },
    BoardComentBox:{
        flexDirection:'row',
        padding:10,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor:"#D9D9D9",
        marginBottom:20,
    },
    ComentContainer:{
        flexDirection:'row',
        marginBottom:20,
    },
    ComentItem:{
        width:260,
    },
    ComentImgBox:{
        marginRight:10
    },
    comentinputBox:{
        backgroundColor:'#BDBDBD',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:15,
        borderRadius:30,
    }
})


const Board = ({ navigation,route }) => {
    const insets = useSafeAreaInsets();
    const user = getCurrentUser();

   
    const [Userphoto,setPhoto] = useState();

    const [coment, setComent] = useState([]);

    const db = getFirestore(app);

    const getDateOrTime = ts => {
        const now = moment().startOf('day');
        const target = moment(ts).startOf('day');
        return moment(ts).format(now.diff(target, 'day') > 0 ? 'YYYY.MM.DD' : 'YYYY.MM.DD');
    };


    useEffect(() => {
        const docRef = doc(db, 'Board', route.params.id);
        const userid = route.params.CreatorId;
        const profileimgurl = getImg(userid);
        setPhoto(profileimgurl._j);
        const collectionQuery = query(
          collection(db, `${docRef.path}/Comments`),
          orderBy('CreatedAt', 'desc')
        );
        const unsubscribe = onSnapshot(collectionQuery, snapshot => {
          const list = [];
          snapshot.forEach(doc => {
            list.push(doc.data());
          });
          setComent(list);
        });
        return () => unsubscribe();
      }, []);
    

    const _handlePhotoChange = async url => {
        try {
          const photoURL = await updateUserInfo(url);
          setPhoto(photoURL);
        } catch (e) {
          Alert.alert('Photo Error', e.message);
        } 
      };

    const _handleComentSend = async () => {
        try {
            const doc_id = route.params.id;
            await createComent({coment,doc_id});
            
          } catch (e) {
            Alert.alert('Message Error', e.message);
          }
    }

    const _handleComentChange = coment => {
        const list=[];
        list.push(coment);
        setComent(list);
    }


    const LOGO = 'https://firebasestorage.googleapis.com/v0/b/swingfit-a15ef.appspot.com/o/ex.png?alt=media';

    const Item = React.memo(
        ({ item: { CreatorId,coment,CreatedAt,name }}) => {
          return (
           <View style={styles.ComentContainer}>
                <View style={styles.ComentImgBox}>
                    <Image url={getImg(CreatorId)._j} styles={{borderRadius:90,width:50,height:50}}/>
                </View>
                <View style={styles.ComentItem}>
                    <Text style={{fontWeight:'bold'}}>{name}</Text>
                    <Text style={{marginBottom:7}}>{getDateOrTime(CreatedAt)}</Text>
                    <Text>{coment}</Text>
                </View>
           </View>
          );
        }
      );
    
    return (

        <KeyboardAwareScrollView keyboardShouldPersistTaps="always" extraScrollHeigh={20} >
            <Container insets={insets}>

            <ItemCategory>{route.params.Category}</ItemCategory>

            <View style={styles.BoardProfileContainer}>
                <Image url={Userphoto} onChangePhoto={_handlePhotoChange} styles={{width:80,height:80,
                        borderColor: 'black',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderRadius:90,
                }}/>
                <View style={{flexDirection:'column', marginTop:20,marginLeft:15}}>
                    <Text style={{fontSize:15,fontWeight:'bold'}}>{user.name}</Text>
                    <Text>{getDateOrTime(route.params.CreatedAt)}</Text>
                </View>
                <TouchableOpacity style={{marginTop:13,marginLeft:150}} onPress={() => navigation.pop()}>
                    <AntDesign name="close" size={35} color="black" />
                </TouchableOpacity>
            </View>

            <View>
                <Text style={styles.BoardTitle}>{route.params.Title}</Text>
                <Text style={styles.BoardDesc}>{route.params.Desc}</Text>
                <Image styles={{marginLeft:10,width:300,height:400,borderRadius:20}}  url={LOGO}/>
            </View>

            <View style={styles.BoardComentBox}>
                <Ionicons name="chatbubble-outline" size={27} color="black" />
                <Text style={{marginLeft:10,lineHeight:26}}>댓글 {coment.length}</Text>
            </View>

            <View>
                <View>
                    {
                        coment.map((items) => {
                        return <Item item={items}/>
                        })
                    }

                </View>
                <View style={styles.comentinputBox}>
                    <TextInput 
                    placeholder='댓글을 남겨보세요'
                    value={coment}
                    onChangeText={_handleComentChange}
                    onSubmitEditing={_handleComentSend}
                    returnketType="done"
                    onBlur={() => setComent(coment)}
                    multiline = {true} 
                    numberOfLines = {2} 
                    />
                    <TouchableOpacity onPress={_handleComentSend} 
                    style={{
                        marginRight:20,
                        paddingTop:8,
                        paddingLeft:20,
                        borderLeftColor:'#8E8E8E',
                        borderLeftWidth:2,
                        }}>
                        <Text>등록</Text>
                    </TouchableOpacity>
                    </View>
                
            </View>
            </Container>
    </KeyboardAwareScrollView>
      
    );
  };
  
  export default Board;