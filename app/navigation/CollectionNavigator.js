import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Collection from "../screens/Collection";
import Categories from "../screens/Categories";
import Charities from "../screens/Charities";

export default function CollectionNavigator() {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator screenOptions={{ headerShown: false  }} initialRouteName="CollectionStack">
			<Stack.Screen name="CollectionStack" component={Collection} />
			<Stack.Screen name="CategoriesStack" component={Categories} />
			<Stack.Screen name="CharitiesStack" component={Charities} />
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({});
