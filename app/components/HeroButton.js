import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'

import AppColors from '../config/AppColors'

export default function HeroButton({text}) {
  const onPress = () => {
      console.log("Button Pressed");
      alert("I doth been pressed");
  }
  return (
    <TouchableHighlight style={styles.buttonTouch} onPress={onPress}>
      <View style={styles.button}><Text style={styles.text}>{text}</Text></View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  buttonTouch: {
    borderRadius: 10,
  },
  button: {
    backgroundColor: AppColors.main,
    alignItems: "center",
    paddingVertical: 25,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: AppColors.lightShade,
  },
})