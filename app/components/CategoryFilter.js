import {
	StyleSheet,
	View,
	TouchableHighlight,
	Modal,
	Text,
	Button,
	TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FlatList } from "react-native-gesture-handler";

import Title from "./Title";
import AppColors from "../config/AppColors";

export default function CategoryFilter({ categories, currentCategory, setCurrentCategory }) {
	const [modalVisible, setModalVisible] = useState(false);

  const chooseCategory = ({item}) => {
    setCurrentCategory(item);
    setModalVisible(false);
  }
	return (
		<View>
			<TouchableOpacity
				onPress={() => setModalVisible(true)}
				style={styles.iconView}
			>
				<Text>{currentCategory ? currentCategory : "Categories"}</Text>
				<Ionicons name="funnel" size={30} color="black" />
			</TouchableOpacity>
			<Modal
				visible={modalVisible}
				animationType="slide"
				onRequestClose={() => setModalVisible(false)}
			>
				<Title>Categories</Title>
				<FlatList
					data={categories}
					renderItem={({ item }) => (
						<TouchableOpacity style={styles.item} onPress={() => chooseCategory({item})}>
							<Text>{item}</Text>
						</TouchableOpacity>
					)}
					keyExtractor={(item) => item}
				/>
        <TouchableOpacity onPress={() => {
          setCurrentCategory("");
          setModalVisible(false);
        }}>
          <Text>Clear Selection</Text>
        </TouchableOpacity>
				<Button
					title="Close"
					color={AppColors.main}
					onPress={() => setModalVisible(false)}
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
	},
});
