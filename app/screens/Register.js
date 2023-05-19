import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";

import AppColors from "../config/AppColors";
import AppScreen from "../components/AppScreen";
import DefaultTextInput from "../components/DefaultTextInput";
import TextLink from "../components/TextLink";
import DataManager from "../config/DataManager";
import ErrorText from "../components/ErrorText";

export default function Register() {
	const validationSchema = yup.object({
		firstName: yup.string().required("First Name is required"),
		lastName: yup.string().required("Last Name is required"),
		dob: yup.date().nullable().required("Date of Birth is required"),
		email: yup
			.string()
			.email("Invalid Email Address")
			.required("Email is required"),
		password: yup.string().required("Password is required"),
	});

	// Visibility
	const [showDate, setShowDate] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const navigation = useNavigation();

	const submitRegistration = (values) => {
		const dm = DataManager.getInstance();
		if (dm.getUser(values.email)) {
			alert("Email is already in use");
			return;
		}

		const user = { 
			userId: dm.generateUserId(),
			image: null,
			email: values.email,
			firstName: values.firstName,
			lastName: values.lastName,
			dob: values.dob.toISOString(),
			password: values.password,
			collections: dm.generateDefaultCollection(),
		};

		dm.createUser(user);
		navigation.navigate("Home");
	};


	return (
		<AppScreen>
			<Text style={styles.heading}>Sign Up</Text>
			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
					dob: null,
					email: "",
					password: "",
				}}
				onSubmit={submitRegistration}
				validationSchema={validationSchema}
			>
				{({
					handleChange,
					handleBlur,
					handleSubmit,
					values,
					errors,
					setFieldValue,
				}) => (
					<View style={styles.form}>
						<DefaultTextInput
							placeholder="First Name"
							onChangeText={handleChange("firstName")}
							onBlur={handleBlur("firstName")}
							value={values.firstName}
						/>
						{submitted && errors.firstName && (
							<ErrorText>{errors.firstName}</ErrorText>
						)}
						<DefaultTextInput
							placeholder="Last Name"
							onChangeText={handleChange("lastName")}
							onBlur={handleBlur("lastName")}
							value={values.lastName}
						/>
						{submitted && errors.lastName && (
							<ErrorText>{errors.lastName}</ErrorText>
						)}
						<TouchableHighlight
							onPress={() => setShowDate(true)}
							style={styles.dateTouchable}
						>
							{/* Touchable Highlight doesn't work without this view element */}
							<View pointerEvents="none">
								<DefaultTextInput
									placeholder="Date of Birth"
									onChangeText={handleChange("dob")}
									onBlur={handleBlur("dob")}
									value={values.dob ? values.dob.toLocaleDateString() : ""}
									style={styles.dateText}
									readOnly
								/>
							</View>
						</TouchableHighlight>
						{submitted && errors.dob && <ErrorText>{errors.dob}</ErrorText>}
						{showDate && (
							<DateTimePicker
								testID="dateTimePicker"
								value={values.dob || new Date()}
								onBlur={handleBlur("date")}
								mode="date"
								display="default"
								maximumDate={new Date()}
								accentColor={AppColors.main}
								onChange={(event, selectedDate) => {
									setShowDate(false);
									setFieldValue("dob", selectedDate);
								}}
							/>
						)}
						<DefaultTextInput
							placeholder="Email"
							onChangeText={handleChange("email")}
							onBlur={handleBlur("email")}
							value={values.email}
							keyboardType="email-address"
						/>
						{submitted && errors.email && <ErrorText>{errors.email}</ErrorText>}
						<DefaultTextInput
							placeholder="Password"
							onChangeText={handleChange("password")}
							onBlur={handleBlur("password")}
							value={values.password}
							secureTextEntry
						/>
						{submitted && errors.password && (
							<ErrorText>{errors.password}</ErrorText>
						)}
						<TouchableHighlight
							style={styles.buttonTouchable}
							onPress={() => {
								setSubmitted(true);
								handleSubmit();
							}}
						>
							<View style={styles.button}>
								<Text style={styles.buttonText}>Sign Up</Text>
							</View>
						</TouchableHighlight>
					</View>
				)}
			</Formik>
			<View style={styles.switchView}>
				<Text style={{ fontSize: 16, fontWeight: "500" }}>
					Already have an account?
				</Text>
				<TextLink navigateTo="Login">Login</TextLink>
			</View>
		</AppScreen>
	);
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
		gap: 10,
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
});
