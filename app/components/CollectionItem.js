import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import AppColors from "../config/AppColors";

export default function CollectionItem({ collection }) {
	const navigation = useNavigation();

	const defaultImg = require("../assets/defaultFolder.png");
	return (
		<TouchableOpacity
			style={styles.touchableContainer}
			activeOpacity={0.8}
			onPress={() => {
				navigation.navigate("CharitiesStack", { collection });
			}}
		>
			<View style={styles.rightContainer}>
				<Image
					source={collection.image ? { uri: collection.image } : defaultImg}
					style={styles.image}
				/>
				<Text style={styles.text}>{collection.name}</Text>
			</View>
			<Ionicons name="arrow-forward-sharp" size={40} color="white" />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	touchableContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 30,
		paddingVertical: 10,
		backgroundColor: AppColors.darkAccent,
	},
	rightContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	image: {
		width: 32,
		height: 32,
	},
	text: {
		color: AppColors.lightShade,
		fontSize: 18,
		fontWeight: "500",
	},
});
