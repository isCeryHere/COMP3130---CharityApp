import { Button, StyleSheet, View, Text } from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

import AppScreen from "../components/AppScreen";
import AppColors from "../config/AppColors";
import Title from "../components/Title";
import DropPicker from "../components/DropPicker";
import DataManager from "../config/DataManager";
import DefaultTextInput from "../components/DefaultTextInput";
import { Formik } from "formik";

export default function Create() {
	// Import necessary modules and functions
	const dm = DataManager.getInstance();

	const [itemCreate, setItemCreate] = useState({});
	const creation = [
		{ id: 0, name: "Collection" },
		{ id: 1, name: "Category" },
		{ id: 2, name: "Charity" },
	];

	const [collection, setCollection] = useState({});
	const collections = dm.getCollections();

	const [categories, setCategories] = useState({});
	const [category, setCategory] = useState({});
	useEffect(() => {
		if (collection.name) {
			// Fetch categories for the selected collection and structure them
			const fetchCategory = dm.getCategories(collection.id);
			const categoryStructure = fetchCategory.map((item, index) => {
				return { id: index + 1, name: item };
			});
			setCategories(categoryStructure);
		}
	}, [collection]);

	const [image, setImage] = useState(null);
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

	const createItem = (values, { resetForm }) => {
		if (!values.name) {
			alert("Name Field is required");
			return;
		}
		if (itemCreate.name === "Collection") {
			// Create a new collection
			const newImage = image ? image : null;
			const newCollection = {
				id: collections.length,
				name: values.name,
				creationDate: new Date().toISOString(),
				image: newImage,
				categories: [
					"Education",
					"Medication",
					"Cultural",
					"Environmental",
					"Disaster",
				],
				charities: [],
			};
			dm.createCollection(newCollection);
		} else if (itemCreate.name === "Category") {
			// Create a new category
			dm.createCategory(collection.id, values.name);
			const fetchCategory = dm.getCategories(collection.id);
			const categoryStructure = fetchCategory.map((item, index) => {
				return { id: index + 1, name: item };
			});
			setCategories(categoryStructure);
		} else if (itemCreate.name === "Charity") {
			// Create a new charity
			const newImage = image ? image : null;
			const newCharity = {
				id: collection.charities.length,
				name: values.name,
				category: category.name,
				image: newImage,
				description: values.description,
				creationDate: new Date().toISOString(),
			};
			dm.createCharity(collection.id, newCharity);
		}

		// Reset state and form
		setItemCreate({});
		setCollection({});
		setCategory({});
		resetForm();
		setImage(null);

		alert("Item successfully created");
	};

	return (
		<AppScreen>
			<Title>Create</Title>
			<View style={{ gap: 20, paddingHorizontal: 30 }}>
				<DropPicker
					title="Select Creation Type"
					items={creation}
					value={itemCreate}
					setValue={setItemCreate}
				/>

				{(itemCreate.name === "Charity" || itemCreate.name === "Category") && (
					<DropPicker
						title="Select Collection"
						items={collections}
						value={collection}
						setValue={setCollection}
					/>
				)}
				<Formik
					initialValues={{
						name: "",
						description: "",
					}}
					onSubmit={createItem}
				>
					{({ handleChange, handleBlur, handleSubmit, values }) => (
						<View style={{ gap: 20 }}>
							{itemCreate.name && (
								<DefaultTextInput
									placeholder="Name"
									onChangeText={handleChange("name")}
									onBlur={handleBlur("name")}
									value={values.name}
								/>
							)}
							{itemCreate.name === "Charity" && (
								<View style={{ gap: 20 }}>
									<DropPicker
										title="Select Category"
										items={categories}
										value={category}
										setValue={setCategory}
									/>
									<DefaultTextInput
										placeholder="Description"
										onChangeText={handleChange("description")}
										onBlur={handleBlur("description")}
										value={values.description}
										multiline={true}
										textAlignVertical="top"
										rows={6}
									/>
								</View>
							)}
							{(itemCreate.name === "Collection" ||
								itemCreate.name === "Charity") && (
								<>
									<Button
										title="Choose an Image"
										color={AppColors.darkAccent}
										onPress={pickImage}
									/>
									{image && (
										<Text style={{ fontSize: 14 }}>Image Selected</Text>
									)}
								</>
							)}
							{itemCreate.name && (
								<Button
									title="Create Item"
									color={AppColors.main}
									onPress={handleSubmit}
								/>
							)}
						</View>
					)}
				</Formik>
			</View>
		</AppScreen>
	);
}

const styles = StyleSheet.create({});
