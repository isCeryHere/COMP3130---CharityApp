# CharitEasy Charity Application

## Tested On
- Samsung A22
- iPhone 12
(App Looks better on Samsung in my opinion)

## Tips
- Hold finger down on Collection/Charities/Categories to access edit and delete option
- I used a Samsung A22 for prototyping so it probably looks the best on that
- Clicking on the Default Profile Image on the Account screen allows you to change it.
## Unit Tests
### User Management
**Requirements**: The system shall allow for the modification of users. <br />
**User Story**: As a user, I want to create and modify my profile, so I can use the application.

#### Acceptance Criteria

- User can be created (pass)
- User can be deleted (pass)
- User can be acquired from storage (pass)

#### Test Details

**TestID**: T1.01 <br />
**Tester**: Pailo Paul <br />
**Test Setup Steps:**

1. Download Charity Application
2. Open Application on Visual Studio Code
3. Create DataManager.js in Config Folder
4. Create User Management Methods
5. Run npm start

| Test Number | Test Purpose                                                              | Input Parameters | Actual Data Input                                       | Expected Output                                         | Actual Output                                           | Test Status |
| :---------- | :------------------------------------------------------------------------ | :--------------- | :------------------------------------------------------ | :------------------------------------------------------ | :------------------------------------------------------ | :---------- |
| T1.01.01    | To test the functionality of the getUser() function with a valid input    | Email            | user1@example.com                                       | { id: 0, email: "user1@example.com", name: "User 1" }   | { id: 0, email: "user1@example.com", name: "User 1" }   | Pass        |
| T1.01.02    | To test the functionality of the getUser() function with an invalid input    | Email            | invalid@example.com                                     | Undefined                                               | Undefined                                               | Pass        |
| T1.01.03    | To test the functionality of the getUser() function with a valid input    | Json String      | { id:2, email: "newUser@example.com", name:"New User" } | { id:2, email: "newUser@example.com", name:"New User" } | { id:2, email: "newUser@example.com", name:"New User" } | Pass        |
| T1.01.04    | To test the functionality of the deleteUser() function with a valid input | number           | 2                                                       | Undefined                                               | Undefined                                               | Pass        |

This test makes sure that the core components of user management are functional and work as intended. Due to its integral nature when creating a new user. I think that it is important that tests are created for user management to ensure that users are actually able to create accounts to login into the application. These tests are considered unit tests as they are focused on validating the correctness of each unit of the code in isolation to ensure it behaves as expected.

### Collection Management

**Requirements**: The system shall allow for the modification of collections.<br />
**User Story**: As a user, I want to create and modify collections, so I can store charities within them.

#### Acceptance Criteria

- Collection can be created (pass)
- Collection can be deleted (pass)
- Collection can be updated (pass)

#### Test Details

**TestID**: T1.02 <br />
**Tester**: Pailo Paul <br />
**Test Setup Steps:**

1. Download Charity Application
2. Open Application on Visual Studio Code
3. Create DataManager.js in Config Folder
4. Create Collection Management Methods
5. Run npm start

| Test Number | Test Purpose                                                                    | Input Parameters | Actual Data Input                                                                                                                         | Expected Output                                                                                                                           | Actual Output                                                                                                                             | Test Status |
| :---------- | :------------------------------------------------------------------------------ | :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| T1.02.01    | To test the functionality of the createCollection() function with a valid input | Json String      | { id: 1, name: "NewCollection", categories: [ "Education", "Medication", "Cultural", "Environmental", Disaster", ], charities: [], }      | { id: 1, name: "NewCollection", categories: [ "Education", "Medication", "Cultural", "Environmental", Disaster", ], charities: [], }      | { id: 1, name: "NewCollection", categories: [ "Education", "Medication", "Cultural", "Environmental", Disaster", ], charities: [], }      | Pass        |
| T1.02.02    | To test the functionality of the deleteCollection() function with a valid input | Number           | 1                                                                                                                                         | Undefined                                                                                                                                 | Undefined                                                                                                                                 | Pass        |
| T1.02.03    | To test the functionality of the updateCollection() function with a valid input |                  | { id: 0, name: "Updated Collection", categories: [ "Education", "Medication", "Cultural", "Environmental", Disaster", ], charities: [], } | { id: 0, name: "Updated Collection", categories: [ "Education", "Medication", "Cultural", "Environmental", Disaster", ], charities: [], } | { id: 0, name: "Updated Collection", categories: [ "Education", "Medication", "Cultural", "Environmental", Disaster", ], charities: [], } | Pass        |

The Collection Management tests ensure that the creation and modification is possible and is written to storage. As collections house the main functionality of the application, it is vital that tests are made to ensure that the functions work as intended. The Collection Management tests are unit tests as it deals with individual components of the application and don't depend on external units of the system to function. This allows me to validate that the functions in question work as intended without worrying about external factors.