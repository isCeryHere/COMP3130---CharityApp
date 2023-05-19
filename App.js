import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from "./app/navigation/AuthNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
