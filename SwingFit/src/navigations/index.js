import React, {useContext,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './Auth';
import { UserContext, ProgressContext,StartContext } from '../contexts';
import Main from './Main';
import { Spinner } from '../components';
import AppLoading from './AppLoading';


const Navigation = () => {
    const { user } = useContext(UserContext); //App.js에서 UserProvider로 user=uid 를 받아옴
    const { inProgress } = useContext(ProgressContext); // App.js에서 ProgressProvider로 value에 진행중인 작업 여부 및 로딩제어기를 받아옴
    const { isReady2 } = useContext(StartContext);

        return (
        //uid가 존재하면 main스크린을 띄우고 없으면 회원가입 스크린을 띄움
        <NavigationContainer>
            {/* {isReady2 ? <Auth/> : <AppLoading/>} */}
            {user.uid ? <Main/> : isReady2 ? <Auth/> : <AppLoading/> } 
            {inProgress && <Spinner/>}
        </NavigationContainer>
        );
        // inProgress가 true인 경우에만 <Spinner /> 컴포넌트를 렌더링
    //}
   
};

export default Navigation;