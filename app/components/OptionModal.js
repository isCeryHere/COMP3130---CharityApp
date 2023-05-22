import {
	Modal,
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableOpacity,
	Button,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import AppColors from "../config/AppColors";

export default function OptionModal({
	state,
	setState,
	item,
	handleEdit,
	handleDelete,
	noEdit = false,
}) {
	const handlePress = (customMethod) => {
		setState(false);
		customMethod();
	};

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={state}
			onRequestClose={() => {
				setState(false);
			}}
			style={styles.container}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalContent}>
					<Text style={styles.heading}>{item && item.name}</Text>
					<TouchableOpacity onPress={() => handlePress(handleEdit)}>
						{!noEdit && (
							<View style={styles.option}>
								<Text style={styles.optionText}>Edit</Text>
								<Ionicons name="create" size={25} color={AppColors.main} />
							</View>
						)}
					</TouchableOpacity>
					<TouchableOpacity onPress={() => handlePress(handleDelete)}>
						<View style={styles.option}>
							<Text style={styles.optionText}>Delete</Text>
							<Ionicons name="trash" size={25} color={AppColors.red} />
						</View>
					</TouchableOpacity>
					<Button
						title="Close"
						onPress={() => setState(false)}
						color={AppColors.red}
					/>
				</View>
			</View>
		</Modal>
	);
}

const screenWidth = Dimensions.get("window").width * 0.8;
const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		backgroundColor: AppColors.lightShade,
		width: screenWidth,
		maxHeight: screenHeight * 0.7,
		padding: 20,
		borderRadius: 8,
		bottom: 30,
	},
	heading: {
		fontSize: 20,
		fontWeight: 600,
		fontVariant: "small-caps",
		textDecorationLine: "underline",
	},
	option: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 10,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: "#E0E0E0",
		paddingHorizontal: 5,
		marginVertical: 5,
	},
	optionText: {
		fontSize: 16,
	},
});
