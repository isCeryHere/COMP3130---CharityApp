import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight } from 'react-native'
import React, {useState} from 'react';

import AppColors from '../config/AppColors'
import AppScreen from '../components/AppScreen'
import TextLink from '../components/TextLink';
import DefaultInputText from '../components/DefaultTextInput';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    alert("You'll never login. Muhahahahaha.");
  }

  return (
    <AppScreen>
      <View style={styles.header}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.fluff}>Glad to have you back!</Text>
      </View>
      <View style={styles.form}>
        <DefaultInputText 
          placeholder="Username"
          state={username}
          setState={setUsername}
        />
        <DefaultInputText 
          placeholder="Password"
          state={password}
          setState={setPassword}
          secureTextEntry
        />
        <View style={{alignItems: "flex-end"}}><TextLink navigateTo="testLocation">Forgot Password?</TextLink></View>
        <TouchableHighlight 
          onPress={handleSubmit}
          style={styles.loginTouchable}>
          <View style={styles.loginButton}><Text style={styles.loginText}>Login</Text></View>
        </TouchableHighlight>
        <View style={styles.footer}>
          <Text style={styles.footerFluff}>Don't have an account?</Text>
          <TextLink navigateTo="testLocation">Sign Up Today!</TextLink>
        </View>
      </View>
    </AppScreen>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: .5,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  fluff: {
    fontSize: 18,
    fontWeight: "500",
  },
  form: {
    flex: 1,
    paddingHorizontal: 30,
    gap: 10,
  },
  loginTouchable: {
    borderRadius: 5, 
    marginTop: 40,
  },
  loginButton: {
    fontSize: 16,
    backgroundColor: AppColors.main,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 5,
    elevation: 5,
  },
  loginText: {
    color: AppColors.lightShade,
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  footerFluff: {
    fontSize: 16,
    fontWeight: "500",
  },
})

