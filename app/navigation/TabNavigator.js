import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";


import CollectionNavigator from "./CollectionNavigator";
import Charities from "../screens/Charities";
import Account from "../screens/Account";
import AppColors from "../config/AppColors";
import Create from "../screens/Create";


export default function TabNavigator() {
	const Tab = createBottomTabNavigator();
	const iconSize = 35;
	return (
		<Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: {backgroundColor: AppColors.lightShade}}}>
			<Tab.Screen
				name="Collection"
				component={CollectionNavigator}
				options={{
					tabBarIcon: () => (
						<Ionicons name="folder" size={iconSize} color={AppColors.main} />
					),
					unmountOnBlur: true,
				}}
			/>
			<Tab.Screen
				name="Charities"
				component={Charities}
				options={{
					tabBarIcon: () => (
						<Ionicons name="cash" size={iconSize} color={AppColors.main} />
					),
				}}
			/>
			<Tab.Screen 
				name="Create"
				component={Create}
				options={{
					tabBarIcon: () => (
						<Ionicons name="create" size={iconSize} color={AppColors.main} />
					),
				}}
			/>
			<Tab.Screen
				name="Account"
				component={Account}
				options={{
					tabBarIcon: () => (
						<Ionicons name="person-circle" size={iconSize} color={AppColors.main} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({});
