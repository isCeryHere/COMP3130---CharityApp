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
		dob: yup.string().nullable().required("Date of Birth is required"),
		email: yup
			.string()
			.email("Invalid Email Address")
			.required("Email is required"),
		password: yup.string().required("Password is required"),
		confirmPassword: yup
			.string()
			.required("Password Confirmation is required")
			.oneOf([yup.ref("password"), null], "Passwords must match"),
	});

	// Visibility
	const [showDate, setShowDate] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const navigation = useNavigation();

	const submitRegistration = (values) => {
		const dm = DataManager.getInstance();
		if (dm.getUser(values.email) > 0) {
			alert("Email is already in use");
			return;
		}

		const user = {
			userId: dm.generateUserId(),
			email: values.email,
			firstName: values.firstName,
			lastName: values.lastName,
			dob: values.dob,
			password: values.password,
		};

		dm.createUser(user);
		console.log(user);
		// navigation.navigate("Account");
	};

	return (
		<AppScreen>
			<Text style={styles.heading}>Sign Up</Text>
			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
					dob: "",
					email: "",
					password: "",
					confirmPassword: "",
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
									value={values.dob}
									style={styles.dateText}
									readOnly
								/>
							</View>
						</TouchableHighlight>
						{submitted && errors.dob && <ErrorText>{errors.dob}</ErrorText>}
						{showDate && (
							<DateTimePicker
								testID="dateTimePicker"
								value={Date.parse(values.dob) || new Date()}
								onBlur={handleBlur("date")}
								mode="date"
								display="default"
								accentColor={AppColors.main}
								androidVariant="iosClone"
								onChange={(event, selectedDate) => {
									setShowDate(false);
									setFieldValue("dob", selectedDate.toLocaleDateString());
								}}
							/>
						)}
						<DefaultTextInput
							placeholder="Email"
							onChangeText={handleChange("email")}
							onBlur={handleBlur("email")}
							value={values.email}
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
						<DefaultTextInput
							placeholder="Confirm Password"
							onChangeText={handleChange("confirmPassword")}
							onBlur={handleBlur("confirmPassword")}
							value={values.confirmPassword}
							secureTextEntry
						/>
						{submitted && errors.confirmPassword && (
							<ErrorText>{errors.confirmPassword}</ErrorText>
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
