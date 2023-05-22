export default class DataManager {
	static myInstance = null;

	charityId = 0;
	currentUser = {};

	userData = [];

	static getInstance() {
		// Static method to get the instance of the DataManager class
		if (DataManager.myInstance == null) {
			DataManager.myInstance = new DataManager();
		}

		return this.myInstance;
	}

	getUser(email) {
		// Method to get a user object based on email
		const user = this.userData.filter((user) => user.email == email).at(0);

		this.currentUser = user;
		return user;
	}

	getCurrentUser() {
		// Method to get the current user object
		if (this.currentUser) return this.currentUser;
		console.error("No currentUser exists");
	}

	createUser(user) {
		// Method to create a new user
		this.userData.push(user);
		this.currentUser = user;
	}

	updateUser(key, data) {
		// Method to update the current user object
		if (key) {
			this.currentUser[key] = data;
		}
		this.userData[this.currentUser.userId] = { ...this.currentUser };
	}

	generateUserId() {
		// Method to generate a unique user ID
		return this.userData.length;
	}

	deleteUser(id) {
		// Method to delete a user by ID
		this.userData.splice(id, 1);

		for (let i = id + 1; i < this.userData.length; i++) {
			this.userData[i].id = i - 1;
		}
	}

	removeCurrentUser() {
		// Method to remove the current user object
		this.currentUser = null;
	}

	generateDefaultCollection() {
		// Method to generate a default collection for a user
		const currentDate = new Date().toISOString();

		const collection = {
			collections: [
				{
					id: 0,
					name: "Default",
					image: null,
					creationDate: currentDate,
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

		return collection.collections;
	}

	getCollections() {
		// Method to get the collections of the current user
		return this.currentUser.collections;
	}

	createCollection(collection) {
		// Method to create a new collection for the current user
		if (!this.currentUser.collections) {
			this.currentUser.collections = []; // Initialize as an empty array
		}

		this.currentUser.collections.push(collection);
		this.updateUser();
	}

	deleteCollection(collectionId) {
		// Method to delete a collection by ID
		this.currentUser.collections.splice(collectionId, 1);

		const collectionLength = this.currentUser.collections.length;
		for (let i = collectionId; i < collectionLength; i++) {
			this.currentUser.collections[i].id = i;
		}

		this.updateUser();
	}

	updateCollection(collection) {
		// Method to update a collection
		this.currentUser.collections[collection.id] = collection;
		this.updateUser();
	}

	getCategories(collectionId) {
		// Method to get the categories of a collection
		return this.currentUser.collections[collectionId].categories;
	}

	createCategory(collectionId, category) {
		// Method to create a new category for a collection
		this.currentUser.collections[collectionId].categories.push(category);
		this.updateUser();
	}

	deleteCategory(collectionId, category) {
		// Method to delete a category from a collection
		const categories = this.getCategories(collectionId);
		for (let i = 0; i < categories.length; i++) {
			if (categories[i] === category) {
				this.currentUser.collections[collectionId].categories.splice(i, 1);
			}
		}

		const charities = this.getCharities(collectionId);
		for (let i = 0; i < charities.length; i++) {
			if (charities[i].category === category) {
				this.currentUser.collections[collectionId].charities[i].category = "";
			}
		}
	}

	getCharities(collectionId) {
		// Method to get the charities of a collection
		return this.currentUser.collections[collectionId].charities;
	}

	createCharity(collectionId, charity) {
		// Method to create a new charity for a collection
		this.currentUser.collections[collectionId].charities.push(charity);
		this.updateUser();
	}

	deleteCharity(collectionId, charityId) {
		// Method to delete a charity from a collection by ID
		this.currentUser.collections[collectionId].charities.splice(charityId, 1);

		const arrLength =
			this.currentUser.collections[collectionId].charities.length;
		for (let i = charityId; i < arrLength; i++) {
			this.currentUser.collections[collectionId].charities[i].id = i;
		}
		this.updateUser();
	}

	updateCharity(collectionId, charity) {
		// Method to update a charity in a collection
		this.currentUser.collections[collectionId].charities[charity.id] = charity;
		this.updateUser();
	}

	getAllCharities() {
		// Method to get all charities from all collections of the current user
		const charities = [];
		const categories = [];

		let id = 0;
		this.currentUser.collections.map((collection) => {
			collection.charities.map((charity) => {
				const newCharity = charity;
				newCharity.id = id;
				id++;
				charities.push(charity);
			});
			collection.categories.map((category) => {
				const unique = !(
					categories.filter((inArr) => inArr === category).length > 0
				);
				if (unique) {
					categories.push(category);
				}
			});
		});

		const dummyCollection = {
			id: -1,
			name: "",
			creationDate: "28/04/23",
			image: null,
			categories: categories,
			charities: charities,
		};
		return dummyCollection;
	}
}
