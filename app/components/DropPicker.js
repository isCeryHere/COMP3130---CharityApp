import {
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	Modal,
	FlatList,
	Button,
	TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import DefaultTextInput from "./DefaultTextInput";
import Title from "./Title";
import AppColors from "../config/AppColors";

export default function DropPicker({ title, items, value, setValue }) {
	const [modalVisible, setModalVisible] = useState(false);

	const handleItemPress = (item) => {
		setValue(item);
		setModalVisible(false);
	};

	return (
		<View>
			<TouchableHighlight
				onPress={() => {
					setModalVisible(true);
				}}
				style={{ borderRadius: 5 }}
			>
				<>
					<DefaultTextInput
						placeholder={title}
						placeholderTextColor="gray"
						color="black"
						readOnly
						value={value.name}
					/>
					<View style={styles.iconOverlay}>
						<Ionicons name="chevron-down" size={40} color="black" />
					</View>
				</>
			</TouchableHighlight>

			<Modal
				animationType="slide"
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(false);
				}}
			>
				<View style={{backgroundColor: AppColors.lightShade, flex: 1}}>
				<Title>{title}</Title>
				<FlatList
					data={items}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => handleItemPress(item)} style={styles.item}>
							<Text style={styles.itemText}>{item.name}</Text>
						</TouchableOpacity>
					)}
					keyExtractor={(item) => item.id}
					style={{paddingHorizontal: 30}}
				/>
				<Button
					title="Close"
					onPress={() => setModalVisible(false)}
					color={AppColors.main}
					style={styles.button}
				/>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	iconOverlay: {
		position: "absolute",
		top: 10,
		right: 10,
	},
	item: {
		marginVertical: 5,
		padding: 10,
		borderRadius: 5,
		borderWidth: 2,
		borderStyle: "dashed",
		borderColor: AppColors.darkShade,
	},
	itemText: {
		fontSize: 16,
	},
	clearButton: {
		marginHorizontal: 30,
		marginVertical: 20,
		padding: 10,
		borderRadius: 5,
		borderWidth: 3,
		borderColor: AppColors.red,
	},
	clearText: {
		fontWeight: 500,
		fontSize: 16,
	},
});
