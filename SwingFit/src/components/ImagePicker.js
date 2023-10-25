import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import propTypes from 'prop-types';
import {MaterialIcons} from '@expo/vector-icons';
import { Alert , Platform,Text,StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';


const styles = StyleSheet.create({
    disinableBox:{

    },
    disinable:{

    },

});

const ButtonContainer = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.imgBtnBackground};
    position: absolute;
    bottom: 0;
    right: 0;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
`

const ButtonIcon = styled(MaterialIcons).attrs(({theme}) => ({
    name: 'photo-camera',
    size:22,
    color: theme.imgBtnIcon,
}))``;

const PhotoButton = ({onPress,Buttonstyles}) => {
    return (
        <ButtonContainer onPress={onPress} style={Buttonstyles}>
            <ButtonIcon/>
        </ButtonContainer>
    );
};

const Container = styled.View`
    margin-bottom: 20px;
`;

const ProfileImage = styled.Image`
    /* width:300px;
    height:300px; */
    
`;

const  TestImage = ( { url ,onChangePhoto ,styles, toggle}) => {
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {
                    status,
                } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Photo Permission', 
                    'Please turn on the camera perm')
                }
            }
        })();
    }, []);

    const _handlePhotoBtnPress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });    
         if (!result.canceled) {
            onChangePhoto(result.uri);
        }
      };

    return(
        <Container>
            <ProfileImage source={{ uri : url }} style={styles} />
            <Text onPress={_handlePhotoBtnPress} 
            style={{fontSize:33,fontWeight:'bold',color:'#4D7FFF'}}
            >불러오기</Text>
        </Container>
    );
};

// TestImage.defaultProps = {
//     url : 'https://firebasestorage.googleapis.com/v0/b/rn-chat-d4c92.appspot.com/o/face.png?alt=media',
// }

TestImage.propTypes = {
    url : propTypes.string,
    showButton: propTypes.bool,
    onChangePhoto: propTypes.func,
};

export default TestImage;