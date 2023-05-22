export default class DataManager {
	static myInstance = null;

	charityId = 0;
  currentUser = {
		id: 0,
		image: null,
		firstName: "Rob",
		lastName: "Boss",
		email: "Rob@gmail.com",
		dob: "2023-05-21T09:52:57.461Z",
		password: "Abc",
		collections: [
			{
				id: 0,
				name: "Default",
				creationDate: "2023-05-21T09:52:57.461Z",
				image: null,
				categories: [ "Education", "Medication", "Cultural", "Environmental", "Disaster"],
				charities: [{
					id: 0,
					name: "Template",
					category: "Education",
					image: null,
					subHeading: "Very Cool and amazing!!",
					description: "Lorem ipsum stuff",
					creationDate: "2023-05-21T09:52:57.461Z",
					},
					{
						id: 1,
						name: "TeamMain",
						category: "Medication",
						image: null,
						subHeading: null,
						description: "quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin",
						creationDate: "2023-05-21T09:52:57.461Z",
					},
				],
			},
		],
	};

	userData = [
		{
			id: 0,
			firstName: "Rob",
			lastName: "Boss",
			email: "Rob@gmail.com",
			dob: "2023-05-21T09:52:57.461Z",
			password: "Abc",
			collections: [
				{
					id: 0,
					name: "Default",
					creationDate: "2023-05-21T09:52:57.461Z",
					image: null,
					categories: [ "Education", "Medication", "Cultural", "Environmental", "Disaster"],
					charities: [{
						id: 0,
						name: "Template",
						category: "Education",
						image: null,
						subHeading: "Very Cool and amazing!!",
						description: "Lorem ipsum stuff",
						creationDate: "2023-05-21T09:52:57.461Z",
						},
						{
							id: 1,
							name: "TeamMain",
							category: "Medication",
							image: null,
							subHeading: null,
							description: "quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin",
							creationDate: "2023-05-21T09:52:57.461Z",
						},
					],
				},
			],
		},
	];

	static getInstance() {
		if (DataManager.myInstance == null) {
			DataManager.myInstance = new DataManager();
		}

		return this.myInstance;
	}

	getUser(email) {
		const user = this.userData.filter((user) => user.email == email).at(0);

		this.currentUser = user;
		return user;
	}
	getCurrentUser() {
		if(this.currentUser)
			return this.currentUser;
		console.error("No currentUser exists");
	}
	createUser(user) {
		this.userData.push(user);
		this.currentUser = user;
	}
	updateUser(key, data) {
		if(key) {
			this.currentUser[key] = data;
		}
		this.userData[this.currentUser.userId] = {...this.currentUser};
	}
	generateUserId() {
		return this.userData.length;
	}
	deleteUser(id) {
		this.userData.splice(id, 1);

		for (let i = id + 1; i < this.userData.length; i++) {
			this.userData[i].id = i - 1;
		}
	}
	removeCurrentUser() {
		this.currentUser = null;
	}

  generateDefaultCollection() {
    const currentDate = new Date().toISOString();
    
    const collection = {
      collections: [
        {
          id: 0,
          name: "Default",
					image: null,
          creationDate: currentDate,
          categories:  [ "Education", "Medication", "Cultural", "Environmental", "Disaster"],
					charities: [],
        },
      ],
    };

    return collection.collections;
  }

	getCollections() {
		return this.currentUser.collections;
	}
	createCollection(collection) {
		if (!this.currentUser.collections) {
			this.currentUser.collections = []; // Initialize as an empty array
		}
	
		this.currentUser.collections.push(collection);
		this.updateUser();
	}
	deleteCollection(collectionId) {
		this.currentUser.collections.splice(collectionId, 1);
	
		const collectionLength = this.currentUser.collections.length;
		for (let i = collectionId; i < collectionLength; i++) {
			this.currentUser.collections[i].id = i;
		}
	
		this.updateUser();
	}
	updateCollection(collection) {
		this.currentUser.collections[collection.id] = collection;
		this.updateUser();
	}

	getCategories(collectionId) {
		return this.currentUser.collections[collectionId].categories;
	}
	createCategory(collectionId, category) {
		this.currentUser.collections[collectionId].categories.push(category);
		this.updateUser();
	}
	deleteCategory(collectionId, category) {
		const categories = this.getCategories(collectionId);
		for(let i = 0; i < categories.length; i++) {
			if(categories[i] === category) {
				this.currentUser.collections[collectionId].categories.splice(i,1);
			}
		}

		const charities = this.getCharities(collectionId);
		for(let i =0; i < charities.length; i++) {
			if(charities[i].category === category) {
				this.currentUser.collections[collectionId].charities[i].category = "";
			}
		}
	}

	getCharities(collectionId) {
		return this.currentUser.collections[collectionId].charities;
	}
	createCharity(collectionId, charity) {
		this.currentUser.collections[collectionId].charities.push(charity);
		this.updateUser();
	}
	deleteCharity(collectionId, charityId) {
		this.currentUser.collections[collectionId].charities.splice(charityId,1);
		
		const arrLength = this.currentUser.collections[collectionId].charities.length;
		for (let i = charityId; i < arrLength; i++) {
			this.currentUser.collections[collectionId].charities[i].id = i;
		}
		this.updateUser();
	}
	updateCharity(collectionId, charity) {
		this.currentUser.collections[collectionId].charities[charity.id] = charity;
		this.updateUser();
	}

	getAllCharities() {
		const charities = [];
		const categories = [];

		let id = 0;
		this.currentUser.collections.map((collection) => {
			collection.charities.map((charity) => {
				const newCharity = charity;
				newCharity.id = id;
				id++;
				charities.push(charity);
			})
			collection.categories.map((category) => {
				const unique = !(categories.filter((inArr) => inArr === category).length > 0)
				if(unique) {
					categories.push(category);
				}
			})
		})

		
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
