import React ,{ useState , forwardRef }from 'react';
import styled from 'styled-components/native';
import propTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Container = styled.View`
    flex-direction: column;
    width: 100%;
    margin: 10px 0;
`;

const StyledInput = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.inputPlaceholder
}))`
background-color: ${({ theme, editable }) => 
editable ? theme.inputBackground : theme.inputDisabled};
opacity: 0.5;
color: ${({ theme }) => theme.text };
padding: 20px 10px;
width: 360px;
font-size: 16px;
padding: 20px;
border-radius: 32px;
`;


const Input = forwardRef(
    (
        {
        value,
        onChangeText,
        onSubmitEditing,
        onBlur,
        placeholder,
        returnKeyType,
        maxLength,
        isPassword,
        disabled,
        style,
        },
        ref
    ) => {

    const [isFocused, setIsFocused ] = useState(false);

    return (
            <Container>
                <StyledInput
                inlineImageLeft="email-logo"
                ref={ref}
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
                onBlur={() => {
                    setIsFocused(false);
                    onBlur();
                }}
                placeholder={placeholder}
                returnKeyType={returnKeyType}
                maxLength={maxLength}
                autoCapitalize="none"
                isFocused={isFocused}
                onFocused={() => setIsFocused(true)}
                autoCorrect={false}
                secureTextEntry={isPassword}
                editable={!disabled}
                style={style}/>
            </Container>
    );
});

Input.defaultProps={
    onBlur: () => {

    },
};


Input.propTypes = {
    label: propTypes.string,
    value : propTypes.string.isRequired,
    onchangeText: propTypes.func,
    onsubmitEditing: propTypes.func,
    onBlur: propTypes.func,
    placeholder: propTypes.string,
    returnKeyType: propTypes.oneOf(['done','next']),
    maxLength:propTypes.number,
    isPassword:propTypes.bool,
    disabled:propTypes.bool,
}

export default Input;