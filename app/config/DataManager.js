export default class DataManager {
  static myInstance = null;
  userData = [
    {
      userId: 1,
      firstName: "Rob",
      lastName: "Boss",
      email: "rob@gmail.com",
      dob: "20/12/1998",
      password: "abc",
      collections: [
        {
          id: 1,
          name: "Default",
          creationDate: "28/04/23",
          categories: [
            {
              id: 1,
              type: "Education",
              creation: "28/04/23",
              charities: []
            },
            {
              id: 2,
              type: "Medication",
              creation: "28/04/23",
              charities: []
            },
            {
              id: 3,
              type: "Cultural",
              creation: "28/04/23",
              charities: []
            },
            {
              id: 4,
              type: "Environmental",
              creation: "28/04/23",
              charities: []
            },
            {
              id: 5,
              type: "Disaster",
              creation: "28/04/23",
              charities: []
            },
          ]
        },
      ]
    }
  ]


  static getInstance() {
    if(DataManager.myInstance == null) {
      DataManager.myInstance = new DataManager();
    }

    return this.myInstance;
  }


  getUser(email) {
    return this.userData.filter((user) => user.email == email);
  }
  createUser(user) {
    this.userData.push(user);
  }
  generateUserId() {
    return this.userData.length+1;
  }
  deleteUser(id) {
    this.userData.splice(id,1);

    for(let i = id+1; i < this.userData.length; i++) {
      this.userData[i].userId = i-1;
    }
  }
}