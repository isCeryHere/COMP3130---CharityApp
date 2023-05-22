import {
	StyleSheet,
	View,
	Modal,
	Text,
	Button,
	TouchableOpacity,
	Pressable,
	FlatList,
	Vibration,
} from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import Title from "./Title";
import AppColors from "../config/AppColors";
import OptionModal from "./OptionModal";
import DataManager from "../config/DataManager";

export default function CategoryFilter({
	categories,
	currentCategory,
	setCurrentCategory,
	collectionId,
}) {
	const [categoryModalVisible, setCategoryModalVisible] = useState(false);

	const chooseCategory = ({ item }) => {
		setCurrentCategory(item);
		setCategoryModalVisible(false);
	};

	const [optionModalVisible, setOptionModalVisible] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("");
	const dm = DataManager.getInstance();

	const handleLongPress = (category) => {
		setOptionModalVisible(true);
		setSelectedCategory(category);
		Vibration.vibrate();
	};

	const deleteCategory = () => {
		if(collectionId == -1) {
			alert("Must be in Collection Tab to edit Category");
			return;
		}
		dm.deleteCategory(collectionId, selectedCategory);
		categories = dm.getCategories(collectionId);
	};

	return (
		<View>
			<TouchableOpacity
				onPress={() => setCategoryModalVisible(true)}
				style={styles.iconView}
			>
				<Text style={{ fontSize: 16 }}>
					{currentCategory ? currentCategory : "Categories"}
				</Text>
				<Ionicons name="funnel" size={30} color="black" />
			</TouchableOpacity>
			<Modal
				visible={categoryModalVisible}
				animationType="slide"
				onRequestClose={() => setCategoryModalVisible(false)}
			>
				<View style={{ backgroundColor: AppColors.lightShade, flex: 1 }}>
					<Title>Categories</Title>
					<FlatList
						data={categories}
						renderItem={({ item }) => (
							<Pressable
								style={styles.item}
								onPress={() => chooseCategory({ item })}
								onLongPress={() => handleLongPress(item)}
							>
								<Text style={styles.itemText}>{item}</Text>
							</Pressable>
						)}
						keyExtractor={(item) => item}
						style={{ paddingHorizontal: 30 }}
					/>
					<TouchableOpacity
						onPress={() => {
							setCurrentCategory("");
							setCategoryModalVisible(false);
						}}
						style={styles.clearButton}
					>
						<Text style={styles.clearText}>Clear Selection</Text>
					</TouchableOpacity>
					<Button
						title="Close"
						color={AppColors.main}
						onPress={() => setCategoryModalVisible(false)}
					/>
				</View>
				<OptionModal
					state={optionModalVisible}
					setState={setOptionModalVisible}
					item={selectedCategory}
					handleDelete={deleteCategory}
					noEdit
				/>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	iconView: {
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		borderBottomWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingVertical: 5,
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
