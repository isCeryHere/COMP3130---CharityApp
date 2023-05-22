import { StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import React from "react";

import AppScreen from "../components/AppScreen";
import AppColors from "../config/AppColors";
import Title from "../components/Title";
import CollectionItem from "../components/CollectionItem";
import DataManager from "../config/DataManager";
import OptionModal from "../components/OptionModal";
import EditItemModal from "../components/EditItemModal";

export default function Collection() {
	const dm = DataManager.getInstance();
	const [collections, setCollections] = useState([]);
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused) {
			const fetchedCollections = dm.getCollections();
			if (fetchedCollections.length != collections.length) {
				setCollections(fetchedCollections);
			}
		}
		return () => {};
	}, [isFocused]);

	const [selectedCollectionId, setSelectedCollectionId] = useState(0);
	const [optionModalVisible, setOptionModalVisible] = useState(false);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const deleteCollection = () => {
		dm.deleteCollection(selectedCollectionId);
		setCollections(dm.getCollections());
	};

	const editCollection = () => {
		setEditModalVisible(true);
	};

	return (
		<AppScreen>
			<Title>Collections</Title>
			<FlatList
				data={collections}
				renderItem={({ item }) => (
					<CollectionItem
						collection={item}
						setOptionState={setOptionModalVisible}
						setCollectionId={setSelectedCollectionId}
					/>
				)}
				keyExtractor={(item) => item.id}
				style={styles.container}
				extraData={collections}
			/>
			{collections.length > 0 && (
				<OptionModal
					item={collections[selectedCollectionId]}
					state={optionModalVisible}
					setState={setOptionModalVisible}
					handleDelete={deleteCollection}
					handleEdit={editCollection}
				/>
			)}
			{collections.length > 0 && (
				<EditItemModal
					type="Collection"
					item={collections[selectedCollectionId]}
					state={editModalVisible}
					setState={setEditModalVisible}
					refresh={() => setCollections(dm.getCollections())}
				/>
			)}

		</AppScreen>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 25,
		borderColor: AppColors.darkShade,
	},
});
