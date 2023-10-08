import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import propTypes from 'prop-types';

const Container = styled.View`
    background-color: ${({theme}) => theme.btnBackground};
    padding:10px;
    margin:10px 0;
    flex:1;
    justify-content: center;
    align-items: center;
    opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
`;

const Title = styled.Text`
    font-size: 24px;
    color : ${({theme}) => theme.btnTitle};
`;

const Button = ({title,onPress,containerStyle, textStyle,disabled}) => {
    return(
        <TouchableOpacity onPress={onPress} style={{flexDirection:'row'}} disabled={disabled}>
            <Container style={containerStyle} disabled={disabled}>
                <Title style={textStyle}>{title}</Title>
            </Container>
        </TouchableOpacity>
    );
};

Button.propTypes = {
    title: propTypes.string.isRequired,
    onPress: propTypes.func.isRequired,
    containerStyle: propTypes.object,
    textStyle:propTypes.object,
    disabled:propTypes.bool,
};

export default Button;