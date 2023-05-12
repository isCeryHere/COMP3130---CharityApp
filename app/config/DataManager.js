export default class DataManager {
  static myInstance = null;

  data = {
    users: [

    ]
  }

  static getInstance() {
    if(DataManager.myInstance == null) {
      DataManager.myInstance = new DataManager();
    }

    return this.myInstance;
  }


  getUser(email) {
    return this.data.users.filter((user) => user.email == email);
  }
  createUser(user) {
    this.data.users.push(user);
  }
  generateUserId() {
    return this.data.users.length+1;
  }
  deleteUser(user) {
    for(let i = this.data.users.length; i >= 0; i--) {
      if(this.data.users[i] == user)
      {
        this.data.users.splice(i, 1);
        return true;
      }
    }

    return false;
  }
}