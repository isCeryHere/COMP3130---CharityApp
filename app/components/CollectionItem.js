import { StyleSheet, Text, Image, View, Pressable, Vibration } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import AppColors from "../config/AppColors";
import OptionModal from "./OptionModal";

export default function CollectionItem({ collection, setOptionState, setCollectionId }) {
	const navigation = useNavigation();
	const defaultImg = require("../assets/defaultFolder.png");

	const handleLongPress = () => {
		setOptionState(true);
		setCollectionId(collection.id);
		Vibration.vibrate();
	}
	return (
		<Pressable
		style={({ pressed }) => [styles.touchableContainer, { backgroundColor: pressed ? AppColors.darkShade : AppColors.darkAccent }]}
			activeOpacity={0.8}
			onPress={() => {
				navigation.navigate("CharitiesStack", { collection });
			}}
			onLongPress={handleLongPress}
		>
			<View style={styles.rightContainer}>
				<Image
					source={collection.image ? { uri: collection.image } : defaultImg}
					style={styles.image}
				/>
				<Text style={styles.text}>{collection.name}</Text>
			</View>
			<Ionicons name="arrow-forward-sharp" size={40} color="white" />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	touchableContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 30,
		paddingVertical: 10,
	},
	rightContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	image: {
		width: 32,
		height: 32,
		borderRadius: 5,
	},
	text: {
		color: AppColors.lightShade,
		fontSize: 18,
		fontWeight: "500",
	},
});
