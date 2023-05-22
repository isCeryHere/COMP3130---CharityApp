import { StyleSheet, TextInput, TextStyle } from "react-native";

import AppColors from "../config/AppColors";

export default function DefaultTextInput({
	style,
	placeholder,
	secureTextEntry = false,
	...props
}) {
	return (
		<TextInput
			placeholder={placeholder}
			style={[styles.input, style]}
			secureTextEntry={secureTextEntry}
			{...props}
		/>
	);
}

const styles = StyleSheet.create({
	input: {
		paddingHorizontal: 15,
		paddingVertical: 15,
		backgroundColor: AppColors.lightShade,
		borderRadius: 5,
		fontSize: 16,
		elevation: 15,
		shadowColor: "black",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 6,
	},
});
