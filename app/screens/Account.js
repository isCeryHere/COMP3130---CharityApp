import {
	StyleSheet,
	Text,
	View,
	Button,
	Image,
	TouchableOpacity,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, CommonActions } from "@react-navigation/native";

import Title from "../components/Title";
import AppScreen from "../components/AppScreen";
import DataManager from "../config/DataManager";
import AppColors from "../config/AppColors";

export default function Account() {
	// Import Navigation Function
	const navigation = useNavigation();

	// Get an instance of DataManager and fetch the current user
	const dm = DataManager.getInstance();
	const user = dm.getCurrentUser();

	// Set up state for the user's image
	const [image, setImage] = useState(user.image);
	// Function to pick an image from the image library
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Image,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		// Update the image state if an image is selected
		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	// Event handler for the image press
	const handlePress = () => {
		pickImage();
		dm.updateUser("image", image);
	};

	// Event handler for the logout button
	const handleLogout = () => {
		// Reset the navigation stack to the Hero screen
		navigation.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [{ name: "Hero" }],
			})
		);

		dm.removeCurrentUser();
	};

	// Set the default source for the profile image
	const defaultSource = require("../assets/defaultProfile.png");
	return (
		<AppScreen>
			<Title>Account</Title>
			<TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
				<Image
					source={image ? { uri: image } : defaultSource}
					style={styles.profileImage}
				/>
			</TouchableOpacity>
			<View style={styles.container}>
				<Text style={styles.fieldText}>
					<Text style={styles.fieldHeading}>Name: </Text>
					{user.firstName} {user.lastName}
				</Text>
				<Text style={styles.fieldText}>
					<Text style={styles.fieldHeading}>Email: </Text>
					{user.email}
				</Text>
				<Text style={styles.fieldText}>
					<Text style={styles.fieldHeading}>Date of Birth: </Text>
					{new Date(user.dob).toLocaleDateString()}
				</Text>
				<Button title="Logout" color={AppColors.main} onPress={handleLogout} />
			</View>
		</AppScreen>
	);
}

const styles = StyleSheet.create({
	profileImage: {
		height: 256,
		width: 256,
		alignSelf: "center",
		marginBottom: 40,
		borderRadius: 800,
	},
	container: {
		paddingHorizontal: 30,
		gap: 10,
	},
	fieldText: {
		fontSize: 16,
	},
	fieldHeading: {
		fontWeight: "bold",
		fontSize: 17,
	},
});
