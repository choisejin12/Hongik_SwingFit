import React, { useState,useEffect} from 'react';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {StyleSheet,FlatList,Text,View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { app} from '../firebase';
import { Image } from '../components';
import moment from 'moment';
import {
    getFirestore,
    collection,
    onSnapshot,
    query,
    orderBy,
  } from 'firebase/firestore';


const Container = styled.View`
    flex:1;
    padding-top: ${({insets:{top}}) => top}px;
    padding-bottom: ${({insets:{bottom}}) => bottom}px;
`;

const Add = styled.TouchableOpacity`
    position: fixed;
    top:-20px;
    left:300px;
    width: 55px;
    height: 55px;
    border-radius: 30px;
    background-color: #30B465;
    padding: 12px;
`;

const getDateOrTime = ts => {
    const now = moment().startOf('day');
    const target = moment(ts).startOf('day');
    return moment(ts).format(now.diff(target, 'day') > 0 ? 'YYYY.MM.DD' : 'YYYY.MM.DD');
  };
  
  const ItemContainer = styled.TouchableOpacity`
    width: 100%;
    height: 180px;
    flex-direction: column;
    border-bottom-width: 1px;
    border-color:#D9D9D9;
    padding: 15px 20px;
    margin-top: 10px;
    
  `;
  
  const ItemTextContainer = styled.View`
      width: 250px;
      display:flex;
      flex-direction:row;
      margin-right: 35px;
      
  `;

  const ItemTitle = styled.Text`
    font-size: 13px;
    font-weight: 600;
    line-height: 30px;
    margin-left: 5px;
    color: ${({ theme }) => theme.text};
  `;

  const ItemDesc = styled.Text`
    width: 100%;
    height: 57px;
    font-size: 13px;
    margin-top: 5px;
    margin-bottom: 5px;
    color: ${({ theme }) => theme.itemDesc};
  `;

  const ItemTime = styled.Text`
    font-size: 10px;
    color: black;
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

  const stlyes = StyleSheet.create({
    QText:{
      color:'#30B465',
      fontSize:21,
    },
    ImageContainer:{
      backgroundColor:'transparent',
      width:91,
      height:89,
      borderRadius:20,
      zIndex:1,
     
    },
    Content:{
      display: 'flex',
      flexDirection:'row',
    }
  });

  const LOGO = 'https://firebasestorage.googleapis.com/v0/b/swingfit-a15ef.appspot.com/o/image_31.png?alt=media';

  const Item = React.memo(
    ({ item: { CreatorId, Title, Desc, CreatedAt,Category,photo}, onPress}) => {
      return (
        <ItemContainer onPress={() => onPress({ CreatorId, Title })}>
          <ItemCategory>{Category}</ItemCategory>
          <View style={stlyes.Content}>
            <ItemTextContainer>
            {Category=="질문있어요" ? <Text style={stlyes.QText}>Q.</Text> : ''}
            <View style={{width:"100%"}}>
              <ItemTitle>{Title}</ItemTitle>
              <ItemDesc>{Desc}</ItemDesc>
              <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <ItemTime>{getDateOrTime(CreatedAt)}  작성</ItemTime>
              </View>
            </View>
            </ItemTextContainer>
            <Image url={photo} styles={stlyes.ImageContainer}/>
            
            {/* <Image src={LOGO} style={} ></Image> */}
          </View>
        </ItemContainer>
      );
    }
  );

const BoardList = ({ navigation }) => {
    const insets = useSafeAreaInsets();//휴대폰 창 크기
    const [board, setBoard] = useState([]);
   
    const db = getFirestore(app);
  
    useEffect(() => {
      const collectionQuery = query(
        collection(db, 'Board'),
        orderBy('CreatedAt', 'desc')
      );
      
      const unsubscribe = onSnapshot(collectionQuery, snapshot => {
        const list = [];
        
        snapshot.forEach(doc => {
          const data = doc.data();
          // console.log(data); //데이터 확인
          list.push(data);
        });
        //console.log(list); // list 배열 확인
        setBoard(list);
        
      });
      
     
      return () => unsubscribe();
    }, []);
  
    
    return (
      <Container insets={insets}>
         <FlatList
        data={board}
        renderItem={({ item }) => (
          <Item
            item={item}
            onPress={() => navigation.navigate('Board', item)}
          />
        )}
        keyExtractor={(item) => item['id'].toString()}
        windowSize={5}
        />
        <Add onPress={()=>{navigation.navigate('BoardCreation')}}><AntDesign name="plus" size={30} color="white" /></Add>
        
      </Container>
    );
  };
  
  export default BoardList;