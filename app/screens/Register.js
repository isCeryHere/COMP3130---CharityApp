import { StyleSheet, Text, View, TouchableHighlight, Modal } from 'react-native'
import { useState } from 'react';

import AppColors from '../config/AppColors'
import AppScreen from '../components/AppScreen'
import DefaultInputText from '../components/DefaultTextInput';

export default function Register() {
  // User Inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [date, setDate] = useState("");

  // Component Visibility
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const handleSubmit = () => {
    let errorOccurred = false;
    // Name Validation
    if(firstName === "") {
      console.log("First Name field must be filled");
      errorOccurred = true;
    }
    if(lastName === "") {
      console.log("Last Name field must be filled");
      errorOccurred = true;
    }

    // DOB Validation
    if(date === "") {
      console.log("DOB field must be filled");
      errorOccurred = true;
    }

    // Email Validation
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if(email === "") {
      console.log("Email field must be filled")
      errorOccurred = true;
    }
    if(reg.test(email) == false) {
      console.log("Invalid Email Address");
      errorOccurred = true;
    }     

    // Password Validation
    if(password === "") {
      console.log("Password field must be filled");
      errorOccurred = true;
    }
    if(passwordVerify === "") {
      console.log("Password Verification field must be filled");
      errorOccurred = true;
    } else if(password !== "" && password !== passwordVerify) {
      console.log("Password Verification doesn't match - " + password + ":" + passwordVerify);
      errorOccurred = true;
    }

    if(errorOccurred) {
      console.log("Screen Shakes");
      return;
    }

    console.log("Information has been imprinted and user is brought to login/account screen. (Haven't decided yet)");
  }

  return (
    <AppScreen>
      <Text>Sign Up</Text>
      <View>
        <DefaultInputText
          placeholder="First Name"
          state={firstName}
          setState={setFirstName}
        />
        <DefaultInputText 
          placeholder="Last Name"
          state={lastName}
          setState={setLastName}
        />
        <TouchableHighlight onPress={() => setDatePickerVisible(true)} style={styles.dateTouchable}>
          <DefaultInputText 
            placeholder="Date of Birth"
            state={date}
            setState={setDate}
            readOnly
          />
        </TouchableHighlight>
        <DefaultInputText 
          placeholder="Email"
          state={email}
          setState={setEmail}
        />
        <DefaultInputText
          placeholder="Password"
          state={password}
          setState={setPassword}
          secureTextEntry
        />
        <DefaultInputText
          placeholder="Verify Password"
          state={passwordVerify}
          setState={setPasswordVerify}
          secureTextEntry
        />
      </View>
      <TouchableHighlight style={styles.buttonTouch} onPress={handleSubmit}>
        <View style={styles.button}><Text style={styles.text}>Sign Up</Text></View>
      </TouchableHighlight>

    </AppScreen>
  )
}

const styles = StyleSheet.create({
  dateTouchable: {
    borderRadius: 5,
  },

  buttonTouch: {
    borderRadius: 10,
  },
  button: {
    backgroundColor: AppColors.main,
    alignItems: "center",
    paddingVertical: 25,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: AppColors.lightShade,
  },
})