export default class DataManager {
	static myInstance = null;

	charityId = 0;
  currentUser = {
		userId: 0,
		image: null,
		firstName: "Rob",
		lastName: "Boss",
		email: "Rob@gmail.com",
		dob: "20/12/1998",
		password: "Abc",
		collections: [
			{
				collectionId: 0,
				name: "Default",
				creationDate: "28/04/23",
				image: null,
				categories: [
					{
						categoryId: 0,
						type: "Education",
						creation: "28/04/23",
						charities: [{
							charityId: 0,
							name: "Template",
							img: null,
							subHeading: "Very Cool and amazing!!",
							description: "Lorem ipsum stuff",
							creationDate: "28/04/23",
							},
							{
								charityId: 1,
								name: "TeamMain",
								img: null,
								subHeading: null,
								description: "quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin",
								creationDate: "28/04/23",
							},
						],
					},
					{
						categoryId: 1,
						type: "Medication",
						creation: "28/04/23",
						charities: [],
					},
					{
						categoryId: 2,
						type: "Cultural",
						creation: "28/04/23",
						charities: [],
					},
					{
						categoryId: 3,
						type: "Environmental",
						creation: "28/04/23",
						charities: [],
					},
					{
						categoryId: 4,
						type: "Disaster",
						creation: "28/04/23",
						charities: [],
					},
				],
			},
		],
	};

	userData = [
		{
			userId: 0,
			firstName: "Rob",
			lastName: "Boss",
			email: "Rob@gmail.com",
			dob: "20/12/1998",
			password: "Abc",
			collections: [
				{
					collectionId: 0,
					name: "Default",
					creationDate: "28/04/23",
					categories: [
						{
							categoryId: 0,
							type: "Education",
							creation: "28/04/23",
							charities: [{
								charityId: 0,
								name: "Template",
								img: null,
								subHeading: "Very Cool and amazing!!",
								description: "Lorem ipsum stuff",
								creationDate: "28/04/23",
								},
								{
									charityId: 1,
									name: "TeamMain",
									img: null,
									subHeading: null,
									description: "quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin",
									creationDate: "28/04/23",
								},
							],
						},
						{
							categoryId: 1,
							type: "Medication",
							creation: "28/04/23",
							charities: [
								{
									charityId: 2,
									name: "InCat",
									img: null,
									subHeading: "Damn This worked?",
									description: "Lorem ipsum stuff",
									creationDate: "28/04/23",
									},
							],
						},
						{
							categoryId: 2,
							type: "Cultural",
							creation: "28/04/23",
							charities: [],
						},
						{
							categoryId: 3,
							type: "Environmental",
							creation: "28/04/23",
							charities: [],
						},
						{
							categoryId: 4,
							type: "Disaster",
							creation: "28/04/23",
							charities: [],
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
		this.currentUser[key] = data;
		this.userData[this.currentUser.userId] = {...this.currentUser};
	}
	generateUserId() {
		return this.userData.length + 1;
	}
	deleteUser(id) {
		this.userData.splice(id, 1);

		for (let i = id + 1; i < this.userData.length; i++) {
			this.userData[i].userId = i - 1;
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
          collectionId: 0,
          name: "Default",
          creationDate: currentDate,
          categories: this.generateDefaultCategories(),
        },
      ],
    };

    return collection.collections;
  }
  
  generateDefaultCategories() {
    const currentDate = new Date().toISOString();
    const categories = [
      {
        categoryId: 0,
        type: "Education",
        creation: currentDate,
        charities: [],
      },
      {
        categoryId: 1,
        type: "Medication",
        creation: currentDate,
        charities: [],
      },
      {
        categoryId: 2,
        type: "Cultural",
        creation: currentDate,
        charities: [],
      },
      {
        categoryId: 3,
        type: "Environmental",
        creation: currentDate,
        charities: [],
      },
      {
        categoryId: 4,
        type: "Disaster",
        creation: currentDate,
        charities: [],
      },
    ];
  
    return categories;
  }

	getCollections() {
		if(!this.currentUser) {
			console.error("No Current User");
			return null;
		}
	}

	getAllCharities() {
		if(!this.currentUser) {
			console.error("No Current User");
			return null;
		}
		const charities = [];

		this.currentUser.collections.map((collection) => {
			collection.categories.map((category) => {
				category.charities.map((charity) => {
					charities.push(charity);
				})
			})
		})

		return charities;
	}
}
