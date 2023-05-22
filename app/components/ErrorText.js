import { StyleSheet, Text } from "react-native";

export default function ErrorText({ children }) {
	return <Text style={styles.errorText}>{children}</Text>;
}

const styles = StyleSheet.create({
	errorText: {
		fontSize: 12,
		color: "#db0000",
		fontWeight: "bold",
	},
});
