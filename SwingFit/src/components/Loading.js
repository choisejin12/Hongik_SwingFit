import React from 'react';
import {Text,View,StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    Container:{
        alignItems:'center',
        paddingTop:130,
    },
    MainText:{
        fontSize:50,
        fontWeight:'bold',
    },
    TipHeader:{
        position:'absolute',
        width:76,
        height:29,
        backgroundColor:'#FFB7B7',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        left:60,
        top:-15,
    },
    TipBox:{
        position:'relative',
        width:'100%',
        top:150,
        height:84,
        backgroundColor:"rgba(217, 217, 217, 0.5)",

    },
    TipDesc:{
        alignItems:'center',
        marginTop:30
    },

})



const Loading = () => {
    return (
        <View style={styles.Container}>
            <Text style={styles.MainText}>
                진단 중
            </Text>
            <Text style={styles.MainText}>
                •
                {"\n"}
                •
                {"\n"}
                •
            </Text>
            <Text style={{color:'#5C5C5C'}}>사진크기와 기기에 따라 시간이 다소 길어질 수 있습니다.</Text>

            <View style={styles.TipBox}>
                <View style={styles.TipHeader}>
                    <Text style={{fontSize:15}}>TIP !</Text>
                </View>

                <View style={styles.TipDesc}>
                    <Text style={{fontSize:17}}>서두르지 말고 천천히 해보세요!</Text>
                </View>
            </View>
        </View>
    );
};

export default Loading;

