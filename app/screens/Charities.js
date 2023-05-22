import { StyleSheet, View, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import AppScreen from "../components/AppScreen";
import Title from "../components/Title";
import CharityItem from "../components/CharityItem";
import DataManager from "../config/DataManager";
import CategoryFilter from "../components/CategoryFilter";
import OptionModal from "../components/OptionModal";
import EditItemModal from "../components/EditItemModal";

export default function Charities() {
	const route = useRoute();
	const dm = DataManager.getInstance();
	const isFocused = useIsFocused();

	const [collection, setCollection] = useState(
		route.params ? route.params.collection : dm.getAllCharities()
	);
	const [currentCategory, setCurrentCategory] = useState("");
	const [charities, setCharities] = useState(collection.charities);

	useEffect(() => {
		if (isFocused && collection.id == -1) {
			const allCharities = dm.getAllCharities()
			setCollection(allCharities);
			setCharities(allCharities.charities);
		}
		return () => {};
	}, [isFocused]);

	useEffect(() => {
		if (currentCategory) {
			const filteredCharities = collection.charities.filter(
				(charity) => charity.category === currentCategory
			);
			setCharities(filteredCharities);
		} else {
			setCharities(collection.charities);
		}
	}, [currentCategory]);

	const [optionModalVisible, setOptionModalVisible] = useState(false);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [selectedCharity, setSelectedCharity] = useState({});

	const deleteCharity = () => {
		if (collection.id == -1) {
			alert("Must be in Collection Tab to delete Charity");
			return;
		}
		dm.deleteCharity(collection.id, selectedCharity);
		setCharities(dm.getCharities(collection.id));
	};

	const editCharity = () => {
		if (collection.id == -1) {
			alert("Must be in Collection Tab to edit Charity");
			return;
		}
		setEditModalVisible(true);
	};

	return (
		<AppScreen>
			<View style={styles.container}>
				<Title>
					{collection.name ? collection.name + " -" : "All"} Charities
				</Title>
				<CategoryFilter
					categories={collection.categories}
					currentCategory={currentCategory}
					setCurrentCategory={setCurrentCategory}
					collectionId={collection.id}
				/>
				<FlatList
					data={charities}
					renderItem={({ item }) => (
						<CharityItem
							charity={item}
							setCharityId={setSelectedCharity}
							setOptionState={setOptionModalVisible}
						/>
					)}
					keyExtractor={(item) => item.id}
				/>

				{charities && charities.length > 0 && (
					<OptionModal
						state={optionModalVisible}
						setState={setOptionModalVisible}
						item={selectedCharity}
						handleDelete={deleteCharity}
						handleEdit={editCharity}
					/>
				)}
				{charities && charities.length > 0 && (
					<EditItemModal
						type="Charity"
						item={selectedCharity}
						state={editModalVisible}
						setState={setEditModalVisible}
						categories={collection.categories}
						collectionId={collection.id}
						refresh={() => setCharities(dm.getCharities(collection.id))}
					/>
				)}
			</View>
		</AppScreen>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 30,
	},
});
