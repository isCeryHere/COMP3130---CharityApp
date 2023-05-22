import {
	StyleSheet,
	Text,
	Pressable,
	View,
	Vibration,
	Image,
} from "react-native";
import { useState } from "react";

import AppColors from "../config/AppColors";
import CharityModal from "./CharityModal";

export default function CharityItem({ charity, setOptionState, setCharityId }) {
	const [modalVisible, setModalVisible] = useState(false);
	const handleLongPress = () => {
		setOptionState(true);
		setCharityId(charity.id);
		Vibration.vibrate();
	};
	return (
		<View>
			<Pressable
				style={({ pressed }) => [
					styles.container,
					{
						backgroundColor: pressed
							? AppColors.darkShade
							: AppColors.darkAccent,
					},
				]}
				onPress={() => setModalVisible(true)}
				onLongPress={handleLongPress}
			>
					<View>
						<Text style={styles.title}>{charity.name}</Text>
						<Text style={styles.subHeading}>{charity.category}</Text>
					</View>
					<View>
						{charity.image &&
						<Image 
							source={{uri: charity.image}}
							style={styles.charityImage}
						/>
						}
					</View>
			</Pressable>
			<CharityModal
				charity={charity}
				state={modalVisible}
				setState={setModalVisible}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 100,
		backgroundColor: AppColors.darkAccent,
		borderRadius: 20,
		elevation: 5,
		paddingHorizontal: 30,
		paddingVertical: 20,
		marginVertical: 10,

		flexDirection: "row",
		justifyContent: "space-between",
	},
	title: {
		fontSize: 20,
		fontWeight: "600",
		color: AppColors.lightShade,
	},
	subHeading: {
		fontSize: 16,
		fontWeight: "400",
		color: AppColors.lightShade,
	},
	charityImage: {
		height: 60,
		width: 60,
		borderRadius: 5,
	},
});
