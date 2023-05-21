import { StyleSheet, Button, View, Modal } from "react-native";
import React from "react";
import { Formik } from "formik";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import Title from "./Title";
import DefaultTextInput from "./DefaultTextInput";
import AppColors from "../config/AppColors";
import DataManager from "../config/DataManager";
import DropPicker from "./DropPicker";

export default function EditItemModal({ type, item, state, setState,  refresh, categories, collectionId }) {
	const [image, setImage] = useState(item.image);
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
	};

	const [category, setCategory] = useState(item.category);

  const dm = DataManager.getInstance();

  const handleSubmit = (values) => {
    if(type==="Collection") {
      const updatedCollection = {
        id: item.id,
        name: values.name,
        image: image,
        creationDate: item.creationDate,
        categories: item.categories,
        charities: item.charities
      }
      dm.updateCollection(updatedCollection);
    } else if(type==="Charity") {
      const updatedCharity = {
        id: item.id,
        name: values.name,
        category: category.name ? category.name : category,
        image: image,
        description: values.description,
        creationDate: item.creationDate,
      }
      dm.updateCharity(collectionId, updatedCharity);
    }
    refresh();
    setState(false);
  }
	return (
		<Modal
			animationType="slide"
			visible={state}
			onRequestClose={() => {
				setState(false);
			}}
			style={styles.container}
		>
			<View>
				<Title>Edit Item</Title>
				<Formik
					initialValues={{
						name: item.name,
						description: item.description,
					}}
          onSubmit={handleSubmit}
				>
					{({ handleChange, handleBlur, handleSubmit, values }) => (
						<View>
							<DefaultTextInput
								placeholder="Name"
								onChangeText={handleChange("name")}
								onBlur={handleBlur("name")}
								value={values.name}
							/>
							{type === "Charity" && (
								<View>
									<DropPicker
										title="Select Category"
										items={categories.map((item, index) => {
											return { id: index + 1, name: item };
										})}
										value={category}
										setValue={setCategory}
									/>
									<DefaultTextInput
										placeholder="Description"
										onChangeText={handleChange("description")}
										onBlur={handleBlur("description")}
										value={values.description}
									/>
								</View>
							)}
							<Button
								title="Change Image"
								color={AppColors.main}
								onPress={pickImage}
							/>
							<View>
								<Button
									title="Cancel"
									color="#ed2f2f"
									onPress={() => setState(false)}
								/>
								<Button
									title="Edit"
									color={AppColors.main}
									onPress={handleSubmit}
								/>
							</View>
						</View>
					)}
				</Formik>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({});
