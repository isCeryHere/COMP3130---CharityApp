import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";

import AppColors from "../config/AppColors";
import AppScreen from "../components/AppScreen";
import TextLink from "../components/TextLink";
import DataManager from "../config/DataManager";
import DefaultTextInput from "../components/DefaultTextInput";
import ErrorText from "../components/ErrorText";

export default function Login() {
	const [submitted, setSubmitted] = useState(false);
	const navigation = useNavigation();

	const validationSchema = yup.object({
		email: yup
			.string()
			.email("Invalid email address")
			.required("Email is required"),
		password: yup.string().required("Password is required"),
	});

	const submitLogin = (values) => {
		const dm = DataManager.getInstance();
		const dmUser = dm.getUser(values.email);
		
		if (!dmUser) {
			alert("User does not exist");
			return;
		} else if (dmUser.password !== values.password) {
			alert("Login Failed");
			return;
		}

		navigation.navigate("Home");
	};

	return (
		<AppScreen>
			<View style={styles.header}>
				<Text style={styles.title}>Login</Text>
				<Text style={styles.fluff}>Glad to have you back!</Text>
			</View>
			<Formik
				initialValues={{
					email: "",
					password: "",
				}}
				validationSchema={validationSchema}
				onSubmit={submitLogin}
			>
				{({ handleChange, handleBlur, handleSubmit, values, errors }) => (
					<View style={styles.form}>
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
						<View style={{ alignItems: "flex-end" }}>
							<TextLink>Forgot Password?</TextLink>
						</View>
						<TouchableHighlight
							onPress={() => {
								setSubmitted(true);
								handleSubmit();
							}}
							style={styles.loginTouchable}
						>
							<View style={styles.loginButton}>
								<Text style={styles.loginText}>Login</Text>
							</View>
						</TouchableHighlight>
						<View style={styles.footer}>
							<Text style={styles.footerFluff}>Don't have an account?</Text>
							<TextLink navigateTo="Register">Sign Up Today!</TextLink>
						</View>
					</View>
				)}
			</Formik>
		</AppScreen>
	);
}

const styles = StyleSheet.create({
	header: {
		flex: 0.5,
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
});
