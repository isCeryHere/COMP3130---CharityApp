export default class DataManager {
	static myInstance = null;

	charityId = 0;
  currentUser = {
		id: 0,
		image: null,
		firstName: "Rob",
		lastName: "Boss",
		email: "Rob@gmail.com",
		dob: "20/12/1998",
		password: "Abc",
		collections: [
			{
				id: 0,
				name: "Default",
				creationDate: "28/04/23",
				image: null,
				categories: [ "Education", "Medication", "Cultural", "Environmental", "Disaster"],
				charities: [{
					id: 0,
					name: "Template",
					category: "Education",
					image: null,
					subHeading: "Very Cool and amazing!!",
					description: "Lorem ipsum stuff",
					creationDate: "28/04/23",
					},
					{
						id: 1,
						name: "TeamMain",
						category: "Medication",
						image: null,
						subHeading: null,
						description: "quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin",
						creationDate: "28/04/23",
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
			dob: "20/12/1998",
			password: "Abc",
			collections: [
				{
					id: 0,
					name: "Default",
					creationDate: "28/04/23",
					image: null,
					categories: [ "Education", "Medication", "Cultural", "Environmental", "Disaster"],
					charities: [{
						id: 0,
						name: "Template",
						category: "Education",
						image: null,
						subHeading: "Very Cool and amazing!!",
						description: "Lorem ipsum stuff",
						creationDate: "28/04/23",
						},
						{
							id: 1,
							name: "TeamMain",
							category: "Medication",
							image: null,
							subHeading: null,
							description: "quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin",
							creationDate: "28/04/23",
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
		return this.userData.length + 1;
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
		if(!this.currentUser) {
			console.error("No Current User");
			return [];
		}
		return this.currentUser.collections;
	}
	createCollection(collection) {
		if(!this.currentUser) {
			console.error("No Current User");
			return;
		}
		this.currentUser.collections.push(collection);
	}

	getCategories(collectionId) {
		if(!this.currentUser) {
			console.error("No Current User");
			return null;
		}
		return this.currentUser.collections[collectionId].categories;
	}
	createCategory(collectionId, category) {
		if(!this.currentUser) {
			console.error("No Current User");
			return;
		}
		this.currentUser.collections[collectionId].categories.push(category);
	}

	getCharities(collectionId) {
		if(!this.currentUser) {
			console.error("No Current User");
			return null;
		}
		return this.currentUser.collections[collectionId].charities;
	}
	createCharity(collectionId, charity) {
		if(!this.currentUser) {
			console.error("No Current User");
			return null;
		}
		this.currentUser.collections[collectionId].charities.push(charity);
	}

	getAllCharities() {
		if(!this.currentUser) {
			console.error("No Current User");
			return null;
		}

		const charities = [];
		const categories = [];
		this.currentUser.collections.map((collection) => {
			collection.charities.map((charity) => {
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
