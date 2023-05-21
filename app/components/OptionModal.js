import { Modal, StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import AppColors from "../config/AppColors";

export default function OptionModal({ state, setState, item, handleEdit, handleDelete }) {

  const handlePress = (customMethod) => {
    setState(false);
    customMethod();
  }

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
					<Text>{item && item.name}</Text>
					<TouchableOpacity onPress={() => handlePress(handleEdit)}>
						<View>
							<Text>Edit</Text>
							<Ionicons name="create" size={20} color={AppColors.main} />
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => handlePress(handleDelete)}>
						<View>
							<Text>Delete</Text>
							<Ionicons name="trash" size={20} color="#ed2f2f" />
						</View>
					</TouchableOpacity>
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
});
