import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import AppColors from "../config/AppColors";

export default function AppScreen({
	children,
	statusStyle = "auto",
	backgroundColor = AppColors.lightShade,
}) {
	return (
		<SafeAreaView
			style={[
				{ backgroundColor: backgroundColor, flex: 1 },
				Platform.OS === "android" && { marginTop: Constants.statusBarHeight },
			]}
		>
			<StatusBar style={statusStyle} backgroundColor={backgroundColor} />
			{children}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({});
