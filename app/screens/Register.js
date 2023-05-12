import { StyleSheet, Text, View, TouchableHighlight, Platform } from 'react-native'
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

import AppColors from '../config/AppColors'
import AppScreen from '../components/AppScreen'
import DefaultInputText from '../components/DefaultTextInput';
import TextLink from '../components/TextLink';
import DataManager from '../config/DataManager';

export default function Register() {
  // User Inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [date, setDate] = useState(new Date());

  // Visibility
  const [showDate, setShowDate] = useState(false);

  const navigation = useNavigation();

  const inputValidation = () => {
    let isCorrect = true;
    // Name Validation
    if(firstName === "") {
      console.log("First Name field must be filled");
      isCorrect = false;
    }
    if(lastName === "") {
      console.log("Last Name field must be filled");
      isCorrect = false;
    }

    // DOB Validation
    if(date === "") {
      console.log("DOB field must be filled");
      isCorrect = false;
    }

    // Email Validation
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if(email === "") {
      console.log("Email field must be filled")
      isCorrect = false;
    }
    if(reg.test(email) == false) {
      console.log("Invalid Email Address: ", email);
      isCorrect = false;
    }     

    // Password Validation
    if(password === "") {
      console.log("Password field must be filled");
      isCorrect = false;
    }
    if(passwordVerify === "") {
      console.log("Password Verification field must be filled");
      isCorrect = false;
    } else if(password !== "" && password !== passwordVerify) {
      console.log("Password Verification doesn't match - " + password + ":" + passwordVerify);
      isCorrect = false;
    }
    
    if(!isCorrect) {
      alert("Registration Failed")
      console.log("Screen Shakes")
    }

    return isCorrect;
  }
  const handleSubmit = () => {
    const dm = DataManager.getInstance();
    if(!inputValidation()) 
      return;
    else if(dm.getUser(email) > 0) {
      alert("Email is already in use");
      return;
    }

    const user = {
      userId: dm.generateUserId(),
      email: email,
      firstName: firstName,
      lastName: lastName,
      dob: date.toLocaleDateString(),
      password: password
    }

    dm.createUser(user);

    // TODO: Navigate to Home Screen
    navigation.navigate("Account");
  }

  return (
    <AppScreen>
      <Text style={styles.heading}>Sign Up</Text>
      <View style={styles.form}>
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
        <TouchableHighlight onPress={() => setShowDate(true)} style={styles.dateTouchable}>
          {/* Touchable Highlight doesn't work without this view element */}
          <View pointerEvents="none">
            <DefaultInputText 
                placeholder="Date of Birth"
                state={date.toLocaleDateString()}
                setState={setDate}
                style={styles.dateText}
              />
          </View>
        </TouchableHighlight>
        {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          accentColor={AppColors.main}
          androidVariant="iosClone"
          onChange={(event, selectedDate) => {
            setShowDate(false);
            setDate(selectedDate);
          }}
        />
        )}
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
        <TouchableHighlight style={styles.buttonTouchable} onPress={handleSubmit}>
          <View style={styles.button}><Text style={styles.buttonText}>Sign Up</Text></View>
      </TouchableHighlight>
      </View>
      <View style={styles.switchView}>
          <Text style={{fontSize: 16, fontWeight: "500"}}>
            Already have an account?
          </Text>
          <TextLink navigateTo="Login">Login</TextLink>
      </View>
    </AppScreen>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 20,
  },
  form: {
    paddingHorizontal: 30,
    gap: 15,
  },
  dateTouchable: {
    borderRadius: 5,
  },
  dateText: {
    color: "black",
  },  
  buttonTouchable: {
    marginTop: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: AppColors.main,
    alignItems: "center",
    paddingVertical: 25,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: AppColors.lightShade,
  },
  switchView: {
    padding: 40,
    alignItems: "center",
  },
})