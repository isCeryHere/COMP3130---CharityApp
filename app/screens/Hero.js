import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

import AppScreen from '../components/AppScreen';
import AppColors from '../config/AppColors';
import HeroButton from '../components/HeroButton';

export default function Hero() {
  return (
    <AppScreen backgroundColor={AppColors.lightShade}>
      <View style={styles.header}>
        <Text style={{fontSize: 40, color: AppColors.lightShade}}>CharitEasy</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.catch}>
            Charity management has never been easier.
          </Text>
          <Text style={styles.shortDesc}>
            Create and manage thousands of charities with the touch of a button
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <HeroButton text="Login" navigateTo="Login"/>
          <HeroButton text="Sign Up" navigateTo="Register"/>
        </View>
      </View>
    </AppScreen>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.main,
    borderRadius: 25,
    margin: 10
  },

  container: {
    flex: 1,
    backgroundColor: AppColors.lightShade,
    paddingHorizontal: 30
  },
  textContainer: {
    gap: 10,
    paddingTop: 15,
    paddingBottom: 40,
    
  },
  catch: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  shortDesc: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    gap: 15,

  },
})