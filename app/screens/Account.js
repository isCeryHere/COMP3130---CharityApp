import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, CommonActions } from "@react-navigation/native";


import Title from "../components/Title";
import AppScreen from "../components/AppScreen";
import DataManager from "../config/DataManager";
import AppColors from "../config/AppColors";

export default function Account() {
  const navigation = useNavigation();

  const dm = DataManager.getInstance();
  const user = dm.getCurrentUser();
  const [image, setImage] = useState(user.image);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const handlePress = () => {
    pickImage();
    dm.updateUser("image", image);

  }
  const handleLogout = () => {
    navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: "Hero" }],
    }));
    
    dm.removeCurrentUser();
  }

  

  const defaultSource = require('../assets/defaultProfile.png');
	return (
		<AppScreen>
			<Title>Account</Title>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
          <Image source={image ? {uri: image} : defaultSource} style={styles.profileImage} />
      </TouchableOpacity>
			<View style={styles.container}>
				<Text style={styles.fieldText}>
					<Text style={styles.fieldHeading}>Name: </Text>
					{user.firstName} {user.lastName}
				</Text>
        <Text style={styles.fieldText}>
					<Text style={styles.fieldHeading}>Email: </Text>
					{user.email}
				</Text>
        <Text style={styles.fieldText}>
					<Text style={styles.fieldHeading}>Date of Birth: </Text>
					{new Date(user.dob).toLocaleDateString()}
				</Text>
        <Button title="Logout" color={AppColors.main} onPress={handleLogout}/>
			</View>
		</AppScreen>
	);
}

const styles = StyleSheet.create({
  profileImage: {
    height: 256,
    width: 256,
    alignSelf: "center",
    marginBottom: 40,
    borderRadius: 800,
  },
  container: {
    paddingHorizontal: 30,
    gap: 10,
  },  
  fieldText: {
    fontSize: 16,
  },
  fieldHeading: {
    fontWeight: "bold",
    fontSize: 17,
    
  },
});
