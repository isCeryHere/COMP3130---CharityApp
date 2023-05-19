import { StyleSheet, View, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";

import AppScreen from "../components/AppScreen";
import Title from "../components/Title";
import CharityItem from "../components/CharityItem";
import DataManager from "../config/DataManager";
import CategoryFilter from "../components/CategoryFilter";

export default function Charities() {
	const route = useRoute();
	const dm = DataManager.getInstance();

	const collection = route.params ? route.params.collection : dm.getAllCharities();

	const [currentCategory, setCurrentCategory] = useState("");
  const [charities, setCharities] = useState(collection.charities);

  useEffect(() => {
    if(currentCategory) {
      const filteredCharities = collection.charities.filter((charity) => charity.category === currentCategory);
      setCharities(filteredCharities);
    } else {
      setCharities(collection.charities);
    }
	}, [currentCategory]);

	return (
		<AppScreen>
				<View style={styles.container}>
					<Title>{collection.name ? collection.name + " -" : "All"} Charities</Title>
					<CategoryFilter
						categories={collection.categories}
						currentCategory={currentCategory}
						setCurrentCategory={setCurrentCategory}
					/>
					<FlatList
						data={charities}
						renderItem={({ item }) => <CharityItem charity={item} />}
						keyExtractor={(item) => item.id}
					/>
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
