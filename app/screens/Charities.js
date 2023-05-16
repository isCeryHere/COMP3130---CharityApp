import { StyleSheet, View, ScrollView } from 'react-native'
import { useRoute } from "@react-navigation/native";

import AppScreen from '../components/AppScreen'
import Title from '../components/Title'
import CharityTab from '../components/CharityTab'
import DataManager from '../config/DataManager';

export default function Charities() {
  const route = useRoute();
  const dm = DataManager.getInstance()

	const charities = route.params ? route.params.charities : dm.getAllCharities();
  
  return (
    <AppScreen>
      <Title>{!route.params && "All"} Charities</Title>
      <ScrollView style={styles.container}>
        {charities.map((charity) => <CharityTab charity={charity} key={charity.charityId}/>)}
      </ScrollView>
    </AppScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
})