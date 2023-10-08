import React, { useContext , useState , useRef , useEffect} from 'react';
import styled from 'styled-components/native';
import {ThemeContext} from 'styled-components/native';
import {Button,Input,ErrorMessage} from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { signin } from '../firebase';
import { Alert } from 'react-native';
import {vaildateEmail, removeWhitespace} from '../utils';
import { UserContext , ProgressContext} from '../contexts';


const Container = styled.View`
    flex:1;
    justify-content:center;
    align-items: center;
    background-color: ${({theme}) => theme.mint};
    padding: 0 20px;
    padding-top: ${({insets:{top}}) => top}px;
    padding-bottom: ${({insets:{bottom}}) => bottom}px;
`;

const StyledText = styled.Text`
    font-size : 45px;
    font-weight: 900;
    color : white;
`;

const Signin = ({navigation}) => {
    const insets = useSafeAreaInsets();//휴대폰 창 크기
    const theme = useContext(ThemeContext);// theme 이용
    const { setUser } = useContext(UserContext); // usercontext 불러오기
    const { spinner } = useContext(ProgressContext); // ProgressContext 불러오기

    //usestate
    const [email,setEmail] = useState('');
    const [password, setPassword ] = useState('');
    const [errorMessage, setErrorMessagee ] = useState('');
    const [disabled, setDisabled ] = useState(true);
    const refPassword = useRef(null);

    //useEffect
    useEffect(() => { //배열안의 값들이 업데이트될 때마다 실행하는 useEffect 함수
        setDisabled(!(email && password && !errorMessage)); // 회원정보가 있고 에러메세지가 없다 : 참 => disabled는 false가 됨 (disabled는 true일때 버튼 비활성화)
    }, [email,password,errorMessage]);

    //이벤트 함수
    const _handleEmailChange = email => { //이메일값이 변경될 때마다 실행되는 함수
        const changedEmail = removeWhitespace(email); // removeWhitespace함수를 이용하여 공백제거
        setEmail(changedEmail);//setEmail로 공백제거한 이메일저장
        setErrorMessagee(
            vaildateEmail(changedEmail) ? '' : 'please verify your email' // 공백제거한 이메일이 이메일양식이 맞다면 에러메세지 x , 맞지않으면 에러메시지 출력
        );
    };

    const _handlePasswordChange = password => { // 패스워드값이 변경될 때마다 실행되는 함수
        setPassword(removeWhitespace(password)); // setpassword함수로 공백을 제거한 password값이 저장
    };

    const _handleSigninBtnPress = async() => { //로그인 버튼을 클릭하면 실행되는 함수
        try{
            spinner.start(); //spinner 실행
            const user = await signin({email,password}); //firebase함수 실행
            setUser(user);//setText로 user 전송 => 네비게이션 index로 user전송됨 =main스크린 띄움
        }catch(e){
            Alert.alert('Sign Error', e.message);
        }finally{
            spinner.stop(); // 스피너 종료
        }
    }
    
    //return
    return (
        <Container insets={insets}>
            <StyledText >Swing Fit</StyledText>
            <StyledText style={{fontSize:17, fontWeight:700}}>AI 골프 자세 교정</StyledText>
            <Input
            placeholder="이메일 주소 입력"
            returnKeyType="next"
            value={email}
            onChangeText={_handleEmailChange}
            onSubmitEditing={() => refPassword.current.focus()}
            style={{fontSize:17, marginTop:30}}
            >
            </Input>
            <Input
            ref={refPassword}
            placeholder="비밀번호 입력"
            name='key-outline'
            returnKeyType="done"
            value={password}
            onChangeText={_handlePasswordChange}
            isPassword={true}
            onSubmitEditing={_handleSigninBtnPress}
            style={{fontSize:17}}
            />
            <ErrorMessage message={errorMessage}/>
            <Button 
            title="로그인" 
            onPress={_handleSigninBtnPress} 
            containerStyle={{
                marginTop:0,
                backgroundColor:"white",
                width:300,
                height:60,
                borderRadius: 30,
                marginBottom: 0,
            }}
            textStyle={{color:'#2029FF', fontSize:17, fontWeight:600}}
            />
            <Button 
            title="회원가입하기" 
            onPress={() => navigation.navigate('SignUp')}
            containerStyle={{ marginTop: 0 , marginLeft:230, backgroundColor: 'transparent' }}
            textStyle={{color:theme.btnTextLink, fontSize:18, color: 'white'}}
            />
        </Container>
    );
};

export default Signin;