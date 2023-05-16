import {
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
	Dimensions,
} from "react-native";
import { useState } from "react";

import AppScreen from "../components/AppScreen";
import DefaultTextInput from "../components/DefaultTextInput";
import Title from "../components/Title";
import AppColors from "../config/AppColors";

export default function Home() {
	const [search, setSearch] = useState("");
	return (
		<AppScreen>
			<Title>Home</Title>
			<View style={styles.charitySelectionView}>
				<DefaultTextInput placeholder="Search for Charity" />
				<View style={styles.touchableView}>
					<TouchableHighlight
						style={[styles.defaultTouchable, styles.charityTouchable]}
					>
						<Text style={styles.touchableText}>View Charities</Text>
					</TouchableHighlight>
					<TouchableHighlight
						style={[styles.defaultTouchable, styles.collectionTouchable]}
					>
						<Text style={styles.touchableText}>View Collections</Text>
					</TouchableHighlight>
				</View>
			</View>

			<View style={styles.dataView}>
				<Text style={styles.dataColor}>Number of Collections</Text>
        <Text style={{color: "grey"}}>|</Text>
				<Text style={styles.dataColor}>Number of Charities</Text>
			</View>

			{/* <View>
        <Text>Recently added Charities</Text>
        <View>
        </View>
      </View> */}
		</AppScreen>
	);
}

const screenWidth = Dimensions.get("window").width * 0.4;

const styles = StyleSheet.create({
	charitySelectionView: {
		paddingHorizontal: 30,
	},
	touchableView: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 30,
	},
	defaultTouchable: {
		width: screenWidth,
		height: 200,
		borderRadius: 20,
		backgroundColor: AppColors.main,
		justifyContent: "flex-end",
		paddingLeft: 15,
		paddingRight: 30,
		paddingVertical: 10,
    elevation: 10,
	},
	charityTouchable: {
		backgroundColor: AppColors.lightAccent,
	},
	collectionTouchable: {
		backgroundColor: AppColors.darkAccent,
	},
	touchableText: {
		color: AppColors.lightShade,
		fontSize: 18,
		fontWeight: "600",
	},
  dataView: {
    paddingVertical: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
    elevation: 1,
  },  
});
