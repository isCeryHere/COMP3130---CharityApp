import {
	StyleSheet,
	Text,
	TouchableOpacity,
	ImageBackground,
	View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import AppColors from "../config/AppColors";
import CharityModal from "./CharityModal";

export default function CharityTab({ charity }) {
	const [modalVisible, setModalVisible] = useState(false);
	const navigation = useNavigation();
	return (
		<View>
			<TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={() => setModalVisible(true)}>
				{charity.img ? (
					<ImageBackground source={{ uri: charity.img }}>
						<Text style={styles.text}>{charity.name}</Text>
						<Text style={styles.subHeading}>{charity.subHeading}</Text>
					</ImageBackground>
				) : (
					<View>
						<Text style={styles.title}>{charity.name}</Text>
						<Text style={styles.subHeading}>{charity.subHeading}</Text>
					</View>
				)}
			</TouchableOpacity>
      <CharityModal charity={charity} state={modalVisible} setState={setModalVisible} /> 
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 200,
		backgroundColor: AppColors.darkAccent,
		borderRadius: 20,
		elevation: 5,
		paddingHorizontal: 30,
		paddingVertical: 20,
		marginVertical: 10,
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
});
