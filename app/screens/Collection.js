import { StyleSheet, Text, View, FlatList } from "react-native";

import AppScreen from "../components/AppScreen";
import AppColors from "../config/AppColors";
import Title from "../components/Title";
import DefaultTextInput from "../components/DefaultTextInput";
import CollectionTab from "../components/CollectionItem";
import DataManager from "../config/DataManager";

export default function Collection() {
	const dm = DataManager.getInstance();
	const collections = dm.getCurrentUser().collections;

	return (
		<AppScreen>
			<Title>Collections</Title>
			<FlatList 
				data={collections}
				renderItem={({item}) => <CollectionTab collection={item} />}
				keyExtractor={item => item.id}
				style={styles.container}
			/>
		</AppScreen>
	);
}

const styles = StyleSheet.create({
	searchInput: {
		marginHorizontal: 30,
	},
	container: {
		flex: 1,
		marginTop: 25,
		borderColor: AppColors.darkShade,
	},
});
