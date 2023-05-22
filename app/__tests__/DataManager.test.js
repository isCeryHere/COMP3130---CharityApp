import DataManager from "../config/DataManager";

describe("userManagement", () => {
	const mockUserData = [
		{ id: 0, email: "user1@example.com", name: "User 1" },
		{ id: 1, email: "user2@example.com", name: "User 2" },
	];
	// Create an instance of DataManager
	const dataManager = DataManager.getInstance();
	dataManager.userData = mockUserData;

	it("returns the correct user based on email", () => {
		// Mock the email
		const mockEmail = "user1@example.com";

		// Create an instance of DataManager

		// Call the getUser function with the mockEmail
		const result = dataManager.getUser(mockEmail);

		// Assert that the getUser function returns the correct user
		expect(result).toEqual({
			id: 0,
			email: "user1@example.com",
			name: "User 1",
		});
	});
	it("returns nothing for an invalid email", () => {
		// Mock the email
		const mockEmail = "invalid@example.com";

		// Call the getUser function with the mockEmail
		const result = dataManager.getUser(mockEmail);

		// Assert that the getUser function returns undefined
		expect(result).toBeUndefined();
	});
	it("creates a new user", () => {
		const mockUser = {id: dataManager.generateUserId(), email: "newUser@example.com", name:"New User"}
		dataManager.createUser(mockUser);

		const result = dataManager.getUser(mockUser.email);
		expect(result).toEqual(mockUser);
		expect(result.id).toEqual(2);
	});
	it("deletes a user", () => {
		const user = dataManager.getUser("newUser@example.com");
		dataManager.deleteUser(user.id);
		expect(dataManager.getUser(user.email)).toBeUndefined();
	});
});
describe("collectionManagement", () => {
	const mockCurrentUserData = {
		id: 0,
		name: "User",
		collections: [
			{
				id: 0,
				name: "Collection",
				categories: [
					"Education",
					"Medication",
					"Cultural",
					"Environmental",
					"Disaster",
				],
				charities: [],
			},
		],
	};

	it("creates a new collection", () => {
		const mockNewCollection = {
			id: 1,
			name: "NewCollection",
			categories: [
				"Education",
				"Medication",
				"Cultural",
				"Environmental",
				"Disaster",
			],
			charities: [],
		};

		const dataManager = DataManager.getInstance();
		dataManager.currentUser = mockCurrentUserData;

		dataManager.createCollection(mockNewCollection);
		expect(dataManager.getCollections()[1]).toEqual(mockNewCollection);
	});
	it("deletes a collection using the id", () => {
		const dataManager = DataManager.getInstance();
		dataManager.deleteCollection(1);
		expect(dataManager.getCollections()[1]).toBeUndefined();
	});
	it("update a pre-existing collection", () => {
		const dataManager = DataManager.getInstance();
		const oldCollection = dataManager.getCollections()[0];
		oldCollection.name = "Updated Collection";
		dataManager.updateCollection(oldCollection);

		expect(dataManager.getCollections()[0]).toEqual({
			id: 0,
			name: "Updated Collection",
			categories: [
				"Education",
				"Medication",
				"Cultural",
				"Environmental",
				"Disaster",
			],
			charities: [],
		});
	});
});
