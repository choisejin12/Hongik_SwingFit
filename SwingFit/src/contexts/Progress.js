import React, {useState, createContext} from 'react';

//ProgressContext라는 새로운 Context를 생성. createContext 함수를 사용하여 <초기값을 설정>
const ProgressContext = createContext({
    inProgress: false, //현재 진행 중인 작업을 나타내는 boolean 값. 초기값은 `false`로 설정
    spinner: {start: () => {}, stop: () => {}}//spinner`: 스피너(로딩 표시기)를 제어하기 위한 객체. `start` 및 `stop` 메서드를 제공하여 스피너를 시작하거나 중지할 수 있음
});

//이제 ProgressProvider라는 컴포넌트를 생성. 이 컴포넌트는 `ProgressContext.Provider`를 사용하여 하위 컴포넌트에 context 값을 제공
const ProgressProvider = ({children}) => {
    //`inProgress`와 `spinner` 상태를 useState 훅을 사용하여 생성
    const [inProgress, setInProgress] = useState(false);
    const spinner = {
        start : () => setInProgress(true),
        stop: () => setInProgress(false),
    }
    const value = {inProgress,spinner}; //`value` 객체에 `inProgress`와 `spinner`를 포함
    return (
    //`ProgressContext.Provider`를 렌더링하고 하위 컴포넌트(`{children}`)에 컨텍스트 값을 제공
    <ProgressContext.Provider value={value}> 
        {children}
    </ProgressContext.Provider>)//value에 진행중인 작업 여부 및 로딩제어기 넘겨줌
};

export {ProgressContext, ProgressProvider};

//`ProgressContext.Consumer`를 사용하거나 `useContext` 훅을 사용하여 `inProgress` 및 `spinner` 상태를 접근할 수 있습니다. 이를 통해 로딩 상태를 관리하고 로딩 표시기를 제어할 수 있습니다.