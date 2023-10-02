import React,{useState,createContext} from "react";

//UserContext라는 새로운 Context를 생성. createContext 함수를 사용하여 <초기값을 설정>
const UserContext = createContext({
    user:{uid:null}, // user의 uid값을 null로 초기화
    setUser: () => {} //setuser함수
});

//이제 UserProvider라는 컴포넌트를 생성. 이 컴포넌트는 `UserContext.Provider`를 사용하여 하위 컴포넌트에 context 값을 제공
const UserProvider = ({children}) => {
    const [user,setUserInfo] = useState({});
    const setUser = ({uid}) => { //해당 uid를 user에 저장
        setUserInfo({uid});
    };
    const value = { user, setUser}; //`value` 객체에 `user`와 `setUser`를 포함
    return <UserContext.Provider value={value}>{children}</UserContext.Provider> //user=uid를 넘겨줌
};

export {UserContext,UserProvider};