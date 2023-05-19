import {
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	Modal,
	FlatList,
	Button,
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
				onPress={() => setModalVisible(true)}
				style={{ borderRadius: 5 }}
			>
				<DefaultTextInput
					placeholder={title}
					placeholderTextColor="gray"
					color="black"
					readOnly
					value={value.name}
				/>
			</TouchableHighlight>
			<View style={styles.iconOverlay}>
				<Ionicons name="chevron-down" size={40} color="black" />
			</View>
			<Modal
				animationType="slide"
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(false);
				}}
			>
				<Title>{title}</Title>
				<FlatList
					data={items}
					renderItem={({ item }) => (
						<TouchableHighlight onPress={() => handleItemPress(item)}>
							<Text>{item.name}</Text>
						</TouchableHighlight>
					)}
					keyExtractor={(item) => item.id}
				/>
				<Button
					title="Close"
					onPress={() => setModalVisible(false)}
					color={AppColors.main}
				/>
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
});
