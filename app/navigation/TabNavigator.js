import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Charities from "../screens/Charities";
import Account from "../screens/Account";
import CollectionNavigator from "./CollectionNavigator";

export default function TabNavigator() {
  const Tab = createBottomTabNavigator();

	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen name="Collection" component={CollectionNavigator} />
			<Tab.Screen name="Charities" component={Charities} />
			<Tab.Screen name="Account" component={Account} />
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({});