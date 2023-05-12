import { StyleSheet, TextInput, TextStyle } from 'react-native'

import AppColors from '../config/AppColors';

export default function DefaultInputText({
    style,
    placeholder,
    state,
    setState,
    secureTextEntry = false,
    ...props
  }) {  
  return (
    <TextInput 
      placeholder={placeholder}
      onChangeText={(newText) => setState(newText)}
      defaultValue={state}
      style={[styles.input, style]}
      secureTextEntry={secureTextEntry}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: AppColors.lightShade,
    borderRadius: 5,
    fontSize: 16,
    elevation: 15,
  },
})