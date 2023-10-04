import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Image } from '../components';
import { getCurrentUser, app,updateUserInfo } from '../firebase';
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
    }
})


const Board = ({ navigation,route }) => {
    const insets = useSafeAreaInsets();
    const user = getCurrentUser();

    const [Userphoto,setPhoto] = useState(user.photo);
    const [coment, setComent] = useState([]);
    const { uid, name, photo } = getCurrentUser();


    const db = getFirestore(app);

    const getDateOrTime = ts => {
        const now = moment().startOf('day');
        const target = moment(ts).startOf('day');
        return moment(ts).format(now.diff(target, 'day') > 0 ? 'YYYY.MM.DD' : 'HH:mm');
    };


    useEffect(() => {
        const docRef = doc(db, 'Board', route.params.id);
        const collectionQuery = query(
        collection(db, `${docRef.path}/Coment`),
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

    useEffect(() => {
        
    });
    const LOGO = 'https://firebasestorage.googleapis.com/v0/b/swingfit-a15ef.appspot.com/o/ex.png?alt=media';
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
                <Text style={{marginLeft:10,lineHeight:26}}>댓글 3</Text>
            </View>
            </Container>
    </KeyboardAwareScrollView>
      
    );
  };
  
  export default Board;