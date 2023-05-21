import { StyleSheet, View, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";

import AppScreen from "../components/AppScreen";
import Title from "../components/Title";
import CharityItem from "../components/CharityItem";
import DataManager from "../config/DataManager";
import CategoryFilter from "../components/CategoryFilter";
import { useIsFocused } from '@react-navigation/native';

export default function Charities() {
	const route = useRoute();
	const dm = DataManager.getInstance();
	const isFocused = useIsFocused();

	const collection = route.params ? route.params.collection : dm.getAllCharities();

	const [currentCategory, setCurrentCategory] = useState("");
  const [charities, setCharities] = useState(collection.charities);

	useEffect(() => {
    if (isFocused && collection.id == -1) {
			const allCharities = dm.getAllCharities();
			setCharities(allCharities.charities);
      // Code to run when the screen gains focus
    }
    // Cleanup code if needed
    return () => {
      // Code to run when the screen loses focus
    };
  }, [isFocused]);

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
