import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Hero from "../screens/Hero";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import TabNavigator from "./TabNavigator";

export default function AuthNavigator() {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Hero" component={Hero} />
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Register" component={Register} />
			<Stack.Screen name="Home" component={TabNavigator} />
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({});
