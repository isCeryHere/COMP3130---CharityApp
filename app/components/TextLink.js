import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppColors from "../config/AppColors";
import { useNavigation } from "@react-navigation/native";

export default function TextLink({ children, navigateTo }) {
	const navigation = useNavigation();

	// TODO: Change Navigation
	return (
		<TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
			<Text style={styles.text}>{children}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	text: {
		color: AppColors.main,
		fontWeight: "500",
		fontSize: 15,
	},
});
