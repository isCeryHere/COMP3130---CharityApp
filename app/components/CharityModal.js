import {
	Modal,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppColors from "../config/AppColors";

export default function CharityModal({ charity, setState, state }) {
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
					<View style={styles.headerView}>
						<Text style={styles.headerName}>{charity.name}</Text>
						<TouchableOpacity onPress={() => setState(false)}>
							<Ionicons name="close-sharp" size={40} color="#ff4242" />
						</TouchableOpacity>
					</View>
					<Text style={styles.charityDesc}>{charity.description}</Text>
				</View>
			</View>
		</Modal>
	);
}

const screenWidth = Dimensions.get("window").width * 0.8;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
	container: {},
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
	headerView: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	headerName: {
		fontSize: 20,
		fontWeight: "bold",
	},
	charityDesc: {
		fontSize: 16,
	},
});
