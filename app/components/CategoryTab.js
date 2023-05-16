import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native'
import { useNavigation } from "@react-navigation/native";

import AppColors from '../config/AppColors';

export default function CategoryTab({category}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={() => navigation.navigate("CharitiesStack", category)}>
      <Text style={styles.text}>{category.type}</Text>
    </TouchableOpacity>
  )
}

const screenWidth = Dimensions.get("window").width * 0.4;
const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppColors.main,
    borderRadius: 5,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: AppColors.lightShade,
  }
})