import React, {useState, createContext} from 'react';

const StartContext = createContext({
    isReady2: false, 
    controls: {start: () => {}, stop: () => {}}
});

const StartProvider = ({children}) => {
    const [isReady2, setIsReady2] = useState(false);
    const controls = {
        start : () => setIsReady2(false),
        stop: () => setIsReady2(true),
    }
    const value = {isReady2,controls};
    return (

    <StartContext.Provider value={value}> 
        {children}
    </StartContext.Provider>)
};

export {StartContext, StartProvider};