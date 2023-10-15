import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { PROVIDER_GOOGLE, Marker  } from 'react-native-maps';
import MapView  from 'react-native-maps';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { FontAwesome5 } from '@expo/vector-icons';

const styles = StyleSheet.create(
    {
        screen:{
            width:'100%',
            height:'100%',
        },
        search: {
            // container 감싸고 있는 컴포넌트
              container: {},
            // input을 감싸는 컴포넌트
              textInputContainer: {
                flexDirection: "row",
               
                width:203,
              },
            // input창
              textInput: {
                backgroundColor: 'rgba(217, 217, 217,1)',
                
                borderRadius: 20,
                paddingVertical: 9,
                paddingHorizontal: 12,
                fontSize: 16,
                color: "#6c6c6e",
              },
            // 검색결과 리스트 컴포넌트
              listView: {
                backgroundColor: "#ffffff",
                borderRadius: 10,
                paddingHorizontal: 10,
                elevation: 8,
                shadowColor: "#6164BB",
              },
            // 검색결과 행
              row: {
                paddingVertical: 20,
              },
            // 검색결과 divided line
              separator: {
                height: 2,
                backgroundColor: "#c8c7cc",
              },
            // 검색결과 text
              description: {
                fontSize: 15,
              },
            // 필요없음
              loader: {
                flexDirection: "row",
                justifyContent: "flex-end",
                height: 20,
              },
            },
      }
);


const Map = () => {
    return(
    <View style={styles.screen}>
        
        <MapView
            style={{ flex: 1 }}
            initialRegion={{
            latitude: 36.610993,
            longitude: 127.294395,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
            }}>
            
            <Marker
                coordinate={{
                latitude: 36.610993,
                longitude: 127.294395,
                }}
                pinColor="#FF9900"
                title="문화골프클럽"
                description="세종특별자치시 조치원읍 새내로 223-1"                
            />
            <Marker
                coordinate={{
                latitude: 36.607764,
                longitude: 127.294093,
                }}
                pinColor="#FF9900"
                title="버디스크린골프"
                description="세종특별자치시 조치원읍 충현로 214"                
            />
            <Marker
                coordinate={{
                latitude: 36.602585,
                longitude: 127.289422,
                }}
                pinColor="#FF9900"
                title="굿샷 스크린골프"
                description="충청남도 연기군 조치원읍 침산리 62"                
            />
            {/* <GooglePlacesAutocomplete
              minLength={2}
              placeholder="검색어 입력"
              query={{
                key: "AIzaSyAPWhrYw0mK-MQGaK4-JcO1THvG-8CA7no",
                language: "ko",
                components: "country:kr",
              }}
              keyboardShouldPersistTaps={"handled"}
              fetchDetails={true}
              onPress={()=> {console.log('ff')}}
              onFail={(error) => console.log(error)}
              onNotFound={() => console.log("no results")}
              keepResultsAfterBlur={true}
              enablePoweredByContainer={false}
              styles={styles.search}
            /> */}
        </MapView>
     
            
        
    </View>


    )
    
  }
  
  
  
  
export default Map;