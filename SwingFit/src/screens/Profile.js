import React, { useContext, useState, useEffect } from 'react';
import { UserContext ,ProgressContext} from '../contexts';
import { Button, Image, Input } from '../components';
import { getCurrentUser, updateUserInfo, signout,createInformation,updateInformation } from '../firebase';
import { Alert,View,Text,TextInput,StyleSheet,ScrollView } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { Feather , FontAwesome5 , Octicons ,MaterialIcons} from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { app } from '../firebase';
import {
  collection,
  query,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore';

const styles = StyleSheet.create({
  Container:
  {
    position:'relative',
    flex:1,
    backgroundColor: 'white',
  },
  styleProfileHeaderTitle:
  {
    position:'absolute',
    top:70,
    left:40,
    fontSize:30,
   
  },
  styleProfileHeaderContainer:
  {
    position:'relative',
    alignItems: "center",
    flexDirection:'row',
    top:150,
    left:40,
  },
  styleProfileHeaderInformation:
  {

    marginLeft:20,
  },
  styleProfileHeaderInformationText:
  {
    color : '#4ABE78',
    fontSize:18,
  },
  styleProfileHeaderHitext:
  {
    marginTop:5,
    flexDirection:'row',
  },
  styleProfileScoreContainer:
  {
    position:'relative',
    top:160,
  },
  styleProfileEvScoreContainer:
  {
    marginLeft:60,
    marginBottom:30,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'white',
    width:298,
    height:46,
    alignItems:'center',
    paddingLeft:25,
    paddingRight:25,
    borderRadius:17, 
    shadowColor: "black",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowRadius: 5,
    elevation: 6,
  },
  styleProfileEvScore:{
    flexDirection:'row',
    alignItems:'center',
  },

  styleProfileProblembContainer:
  {
    marginLeft:60,
    backgroundColor:'white',
    width:298,
    paddingLeft:15,
    paddingTop:10,
    borderRadius:17, 
    shadowColor: "black",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowRadius: 5,
    elevation: 6,
  },
  styleProfileProblemDiv:
  {
    marginTop:10,
    marginLeft:10,
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
  },
  styleProfileProblemTitle:
  {
    fontWeight:'bold',
    marginTop:5,
  },
  styleProfileProblemDesc:
  {
    color:'#5D5D5D',
    width:227,
    fontSize:11,
    marginTop:5,
  },

});


const Profile = () => {
  const { spinner } = useContext(ProgressContext);
  const { setUser } = useContext(UserContext);
  const user = getCurrentUser();
  const insets = useSafeAreaInsets();

  const [photo, setPhoto] = useState(user.photo);
  const [information,setInformation] = useState();
  const [vailed,setVailed] = useState();

  const db = getFirestore(app);

  useEffect(() => {
    const collectionQuery = query(
      collection(db, 'Information')
    );
    const unsubscribe = onSnapshot(collectionQuery, snapshot => {
      snapshot.forEach(doc => {
        if(doc.data().creatorId == user.uid){
          setInformation(doc.data().information);
          setVailed(false);
        }
        else{
          setVailed(true);
        }
      });
    });
    return () => unsubscribe();
  }, []);

  


  const _handleInformationChange = information => {
    setInformation(information);
  }
  const _handlePhotoChange = async url => {
    try {
      spinner.start();
      const photoURL = await updateUserInfo(url);
      setPhoto(photoURL);
    } catch (e) {
      Alert.alert('Photo Error', e.message);
    } finally {
      spinner.stop();
    }
  };

  const _handleInformationSend = async () => {
    try {
      const Doc_id = await createInformation({ information });
      setVailed(false);
    } catch (e) {
      Alert.alert('Message Error', e.message);
    }
  };

  const _handleInformationUpdate = async () => {
    try {
      await updateInformation(information);
    } catch (e) {
      Alert.alert('Message Error', e.message);
    }
  };

  const _handleInformation = () => {
    vailed ? _handleInformationSend() : _handleInformationUpdate();
  };




  return (
    <View style={styles.Container} insets={insets}>
      <ScrollView  contentContainerStyle={{ flex: 1,  height: 1000 }} >
        <Text style={styles.styleProfileHeaderTitle}>초보골퍼! <Text style={{fontWeight:800}}>{user.name}님</Text></Text>

        <View style={styles.styleProfileHeaderContainer}>
          <Image showButton url={photo} onChangePhoto={_handlePhotoChange} styles={{width:140,height:140,
                  borderColor: '#4ABE78',
                  borderStyle: 'solid',
                  borderWidth: 5,
                  borderRadius:90,
                  }}/>
          <View style={styles.styleProfileHeaderInformation}>
            <Text style={styles.styleProfileHeaderInformationText}>초보골퍼</Text>
            <Text style={styles.styleProfileHeaderInformationText}>{user.name}님</Text>
            <View style={styles.styleProfileHeaderHitext}>
              <TextInput 
              placeholder='인사말을 입력해주세요!'
              returnKeyType="done"
              value={information}
              onChangeText={_handleInformationChange}
              ></TextInput>
              <Feather name="edit" size={24} color="black" marginLeft={10} 
              onPress= { _handleInformation}/>
            </View>
          </View>

        </View>

        <View style={styles.styleProfileScoreContainer}>
          <View style={styles.styleProfileEvScoreContainer}>
            <View style={styles.styleProfileEvScore}>
              <Octicons name="graph" size={16} color="black" marginBottom={10} paddingTop={10} marginRight={5} />
              <Text>스윙 평균 점수</Text>
            </View>
            <Text><Text style={{fontWeight:700}}>450</Text> 타</Text> 
            {/*서버에서 불러와야 함 */}
          </View>
          <View style={styles.styleProfileEvScoreContainer}>
            <View style={styles.styleProfileEvScore}>
              <FontAwesome5 name="award" size={16} color="black" marginBottom={10} paddingTop={10} marginRight={5} />
              <Text>스윙 최고 점수</Text>
            </View>
            <Text><Text style={{fontWeight:700}}>520</Text> 타</Text> 
            {/*서버에서 불러와야 함 */}
          </View>
          <View style={styles.styleProfileProblembContainer}>
            <View style={styles.styleProfileEvScore}>
              <MaterialIcons name="mood-bad" size={16} color="black" marginBottom={10} paddingTop={10} marginRight={5} />
              <Text>나의 문제점</Text>
            </View>
            <View style={styles.styleProfileProblemDiv}>
                <Text style={styles.styleProfileProblem} >아쉬워요</Text>
                <Text style={styles.styleProfileProblemTitle}>임팩트 헤드업</Text>
                <Text style={styles.styleProfileProblemDesc}>임팩트 순간 볼을 끝까지 보지 못해 방향성이 저하되고, 거리의 손실이 발생합니다.</Text>
            </View>
            <View style={styles.styleProfileProblemDiv}>
                <Text style={styles.styleProfileProblem} >아쉬워요</Text>
                <Text style={styles.styleProfileProblemTitle}>탑 하체 무너짐</Text>
                <Text style={styles.styleProfileProblemDesc}>백스윙 탑에서 오른쪽 다리가 펴져 하체가 유지 되지 않습니다. 임팩트의 정확도가 떨어지고 슬라이스, 훅을 유발합니다.</Text>
            </View>
            <View style={styles.styleProfileProblemDiv}>
                <Text style={styles.styleProfileProblem} >아쉬워요</Text>
                <Text style={styles.styleProfileProblemTitle}>임팩트 헤드업</Text>
                <Text style={styles.styleProfileProblemDesc}>임팩트 순간 볼을 끝까지 보지 못해 방향성이 저하되고, 거리의 손실이 발생합니다.</Text>
            </View>
          </View>
        </View>
        {/* <Button
          title="Sign out"
          onPress={async () => {
            try {
              spinner.start();
              await signout();
            } catch (e) {
            } finally {
              setUser({});
              spinner.stop();
            }
          }}
          containerStyle={{
            backgroundColor: theme.btnSignOut,
          }}
        /> */}
      </ScrollView>
    </View>
  );
};

export default Profile;