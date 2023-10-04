import React, {Component,useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';

class PickerComponent extends Component {
  state = {
    country: '질문있어요',
  };

  

  render() {
    return (
      <View style={styles.category}>
        <Picker
          selectedValue={this.state.country}
          onValueChange={(val, idx) => this.setState({country: val})}>
          <Picker.Item label="질문있어요" value={'질문있어요'} />
          <Picker.Item label="취미생활" value={'취미생활'} />
          <Picker.Item label="같이해요" value={'같이해요'} />
          <Picker.Item label="동네사진전" value={'동네사진전'} />
          <Picker.Item label="일상" value={'일상'} />
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    category:{
        fontSize:12,
        marginTop:5
    }

});

export default PickerComponent;