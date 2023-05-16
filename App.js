import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from "./app/navigation/AuthNavigator";
import CollectionNavigator from "./app/navigation/CollectionNavigator";
import Home from "./app/screens/Home";
import Account from "./app/screens/Account";
import Collection from "./app/screens/Collection";

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
