import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Title({ children }) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{children}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		paddingTop: 30,
		paddingBottom: 10,
	},
	text: {
		fontSize: 25,
		fontWeight: "bold",
		fontVariant: "small-caps",
	},
});
