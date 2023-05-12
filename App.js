import { StyleSheet } from "react-native";
import Hero from "./app/screens/Hero";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";

export default function App() {
  return (
    <Hero />
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
