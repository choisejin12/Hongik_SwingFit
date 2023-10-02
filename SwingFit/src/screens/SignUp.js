import React, { useState , useRef, useEffect, useContext} from 'react';
import styled from 'styled-components/native';
import {Button,Image,Input,ErrorMessage} from '../components';
import {signup} from '../firebase';
import { Alert } from 'react-native';
import {vaildateEmail, removeWhitespace} from '../utils';
import { UserContext, ProgressContext } from '../contexts';

const Container = styled.View`
    flex:1;
    justify-content:center;
    align-items: center;
    background-color: ${({theme}) => theme.mint};
    padding: 50px 20px;
   
`;

const StyledText = styled.Text`
    font-size : 30px;
    color : #111111;
`;

const DEFAULT_PHOTO = 'https://firebasestorage.googleapis.com/v0/b/swingfit-a15ef.appspot.com/o/main_profile.png?alt=media';

const SignUp = ({navigation}) => {
    const {setUser} = useContext(UserContext); // usercontext 불러오기
    const { spinner } = useContext(ProgressContext);// ProgressContext 불러오기

    //usestate
    const [photo,setphoto] = useState(DEFAULT_PHOTO); 
    const [name,setname] = useState('');
    const [passwordConfirm,setpasswordConfirm] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword ] = useState('');
    const [errorMessage, setErrorMessagee] = useState('');
    const [disabled, setDisabled] = useState(true);

    //ref
    const refPassword = useRef(null);
    const refEmail = useRef(null);
    const refpasswordConfirm = useRef(null);
    const refDidMount = useRef(null); 
    //refDidMount를 쓰는 이유는 처음에 회원가입화면을 들어갔을 때, 에러화면이 뜨지 않아야해서 (사용자가 아무것도 입력하지않았으니까)

    //useEffect
    useEffect(() => { //배열안의 값들이 업데이트될 때마다 실행하는 useEffect 함수
        setDisabled(
            !(name && email && password && passwordConfirm && !errorMessage)
        ); // 회원정보가 있고 에러메세지가 없음 : 참  => disabled = false => 버튼 활성화
    },[email,name,password,passwordConfirm,errorMessage]);

    useEffect(() => {//배열안의 값들이 업데이트될 때마다 실행하는 useEffect 함수
        /**
            refDidMount.current = true
            마운트되었고 사용자가 데이터를 입력함
            refDidMount.current = false
            사용자가 데이터를 입력하지않음 
        */
       if (refDidMount.current){ 
        let error =''; //const는 변수 재선언, 변수 재할당이 불가능 함 = let을 쓰자
        if(!name){//name이없을 때
            error = 'Please enter your name';
        }else if (!email){ //email이 없을 때
            error = 'Please enter your email';
        }else if (!vaildateEmail(email)){ // email 유효성검사 false일 때
            error = 'Please verify your email';
        }else if (password.length < 6){ // pasword길이가 6이하일 때
            error = 'The password must contain 6 characters at least';
        }else if (password !== passwordConfirm){ //password와 passwordconfirm이 일치하지 않을 때
            error = 'Password need to match';
        }else {
            error = '';
        }
        setErrorMessagee(error); //errormessage 설정
       }else {
        refDidMount.current=true; //didmount값을 true로 변경
       } 
    },[email,name,password,passwordConfirm]);

    //이벤트 함수
    const _handleSignupBtnPress = async () => { //버튼 클릭하면 실행 함수
        try{
            spinner.start(); // 스피너 시작
            const user = await signup({name,email,password,photo}); // firebase 회원가입 함수 실행
            setUser(user); //user에 정보저장
        }catch(e){
            Alert.alert('SignUp Error', e.message);
        }finally{
            spinner.stop();//스피너 종료
        }
    }

    //return
    return (
        <Container>
            <Image showButton={true} url={photo} onChangePhoto={setphoto}/>
            <Input
            label="Name"
            placeholder="닉네임 입력"
            returnKeyType="next"
            value={name}
            onChangeText={setname}
            onSubmitEditing={() => refEmail.current.focus()}
            onBlur={() => setname(name.trim())}
            maxLength={12}
            />
            <Input
            ref={refEmail}
            label="Email"
            placeholder="이메일 입력"
            returnKeyType="next"
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={() => refPassword.current.focus()}
            onBlur={() => setEmail(removeWhitespace(email))}
            />
            <Input
            ref={refPassword}
            label="Password"
            placeholder="비밀번호 입력"
            returnKeyType="next"
            value={password}
            onChangeText={setPassword}
            isPassword={true}
            onSubmitEditing={() => refpasswordConfirm.current.focus()}
            onBlur={()=> setPassword(removeWhitespace(password))}
            />
            <Input
            ref={refpasswordConfirm}
            label="Password Confirm"
            placeholder="비밀번호 확인"
            returnKeyType="done"
            value={passwordConfirm}
            onChangeText={setpasswordConfirm}
            isPassword={true}
            onSubmitEditing={_handleSignupBtnPress}
            onBlur={()=> setpasswordConfirm(removeWhitespace(passwordConfirm))}
            />
            <ErrorMessage message={errorMessage}/>
            <Button title="Sign Up" onPress={_handleSignupBtnPress} disabled={disabled}/>
        </Container>
    );
};

export default SignUp;