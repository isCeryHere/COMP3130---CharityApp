import { StyleSheet, Text, View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import React from "react";

import AppScreen from "../components/AppScreen";
import AppColors from "../config/AppColors";
import Title from "../components/Title";
import DefaultTextInput from "../components/DefaultTextInput";
import CollectionTab from "../components/CollectionItem";
import DataManager from "../config/DataManager";

export default function Collection() {
	const dm = DataManager.getInstance();
	const [collections, setCollections] = useState([]);
	const isFocused = useIsFocused();

	useEffect(() => {
    if (isFocused) {
			const fetchedCollections = dm.getCollections();
			if(fetchedCollections.length != collections.length) {
				setCollections(fetchedCollections);
			}
      // Code to run when the screen gains focus
    }
    // Cleanup code if needed
    return () => {
      // Code to run when the screen loses focus
    };
  }, [isFocused]);

	return (
		<AppScreen>
			<Title>Collections</Title>
			<FlatList 
				data={collections}
				renderItem={({item}) => <CollectionTab collection={item} />}
				keyExtractor={item => item.id}
				style={styles.container}
				extraData={collections}
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
