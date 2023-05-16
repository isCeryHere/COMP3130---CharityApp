import { StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";

import Title from "../components/Title";
import AppScreen from "../components/AppScreen";
import DataManager from "../config/DataManager";
import AppColors from "../config/AppColors";
import CategoryTab from "../components/CategoryTab";

export default function Categories() {
	const route = useRoute();
	const collection = route.params.collection;



	return (
		<AppScreen>
			<Title><Text style={styles.collectionTitle}>{collection.name}</Text> - Categories</Title>
			<View style={styles.container}>
        {collection.categories.map((category) => <CategoryTab key={category.categoryId} category={category}/>)}
      </View>
		</AppScreen>
	);
}

const styles = StyleSheet.create({
  collectionTitle: {
    textDecorationLine: "underline",
    textDecorationColor: AppColors.main,
  },
	container: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		rowGap: 20,
		paddingHorizontal: 30,
		paddingVertical: 10,
	},
});
