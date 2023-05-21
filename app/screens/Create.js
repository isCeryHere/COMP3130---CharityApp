import { Button, StyleSheet, Text, View } from "react-native";
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
		if(!values.name) {
			alert("Name Field is required")
			return;	
		}
		if(itemCreate.name === "Collection") {
			const newImage = image ? image : null;
			const newCollection = {
				id: collections.length,
				name: values.name,
				creationDate: new Date().toISOString(),
				image: newImage,
				categories: [ "Education", "Medication", "Cultural", "Environmental", "Disaster"],
				charities: []
			}
			dm.createCollection(newCollection);
		} else if(itemCreate.name === "Category") {
			dm.createCategory(collection.id, values.name);
		} else if(itemCreate.name === "Charity") {
			const newImage = image ? image : null;
			const newCharity = {
				id: collection.charities.length,
				name: values.name,
				category: category.name,
				image: newImage,
				description: values.description,
				creationDate: new Date().toISOString(),
			}
			console.log(newCharity);
			dm.createCharity(collection.id, newCharity);
		}
		alert("Item successfully created")
		resetForm();
		setImage(null);
	}

	return (
		<AppScreen>
			<Title>Create</Title>
			<View>
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
						<View>
							{itemCreate.name && (
								<DefaultTextInput
									placeholder="Name"
									onChangeText={handleChange("name")}
									onBlur={handleBlur("name")}
									value={values.name}
								/>
							)}
							{itemCreate.name === "Charity" && (
							<View>
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
								/>
							</View>
							)}
							{(itemCreate.name === "Collection" ||
								itemCreate.name === "Charity") && (
								<Button
									title="Choose an Image"
									color={AppColors.main}
									onPress={pickImage}
								/>
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

const styles = StyleSheet.create({})
