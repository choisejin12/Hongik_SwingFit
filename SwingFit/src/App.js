import React from 'react';
import {StatusBar} from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import {theme} from './theme';
import Navigation from './navigations';
import { UserProvider, ProgressProvider,StartProvider,LoadingProvider} from './contexts';

const App = () => {
    

    return (
        <ThemeProvider theme={theme}>
            <LoadingProvider>
                <ProgressProvider>
                    <UserProvider>
                        <StartProvider>
                            <StatusBar backgroundColor={theme.background} barStyle="dark-content"/>
                            <Navigation/>
                        </StartProvider>
                    </UserProvider>
                </ProgressProvider>
            </LoadingProvider>
           
        </ThemeProvider>
    );
};

export default App;