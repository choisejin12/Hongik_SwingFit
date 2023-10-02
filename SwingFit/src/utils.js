export const vaildateEmail = email =>{
    const regex = /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/; //이메일 양식 정규표현식
    return regex.test(email); //test() 메서드는 주어진 문자열이 정규 표현식을 만족하는지 판별하고, 그 여부를 true 또는 false로 반환한다
};

export const removeWhitespace = text => {
    const regex = /\s/g; // 공백 정규표현식
    return text.replace(regex,''); //replace() 메서드 = text.replace("찾을 문자열", "변경할 문자열")
}