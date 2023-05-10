import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AppColors from '../config/AppColors'

export default function TextLink(
  {
    children,
    navigateTo,
  } :
  {
    children : string
    navigateTo : string
  }
) {
  return (
    <TouchableOpacity>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    color: AppColors.main,
    fontWeight: "500",
    fontSize: 15,
  }
})