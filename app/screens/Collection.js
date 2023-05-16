import { StyleSheet, Text, View } from "react-native";

import AppScreen from "../components/AppScreen";
import AppColors from "../config/AppColors";
import Title from "../components/Title";
import DefaultTextInput from "../components/DefaultTextInput";
import CollectionTab from "../components/CollectionTab";
import DataManager from "../config/DataManager";

export default function Collection() {
	const dm = DataManager.getInstance();
	const collections = dm.getCurrentUser().collections;

	return (
		<AppScreen>
			<Title>Collections</Title>
			<DefaultTextInput
				placeholder="Search Collections"
				style={styles.searchInput}
			/>
			<View style={styles.container}>
				{collections.map((collection) => (
					<CollectionTab collection={collection} key={collection.collectionId} />
				))}
			</View>
		</AppScreen>
	);
}

const styles = StyleSheet.create({
	searchInput: {
		marginHorizontal: 30,
	},
	container: {
		marginTop: 25,
		borderWidth: 3,
		borderColor: AppColors.darkShade,
	},
});
