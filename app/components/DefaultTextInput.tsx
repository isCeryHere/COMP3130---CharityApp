import { StyleSheet, TextInput, TextStyle } from 'react-native'

import AppColors from '../config/AppColors';

export default function DefaultInputText(
  {
    style,
    placeholder,
    state,
    setState,
    secureTextEntry = false,
    ...props
  } :
  {
    style ?: TextStyle;
    placeholder : string;
    state : string;
    setState : React.Dispatch<React.SetStateAction<string>>;
    secureTextEntry ?: boolean;
    [key: string] : any;
  }
) {  
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