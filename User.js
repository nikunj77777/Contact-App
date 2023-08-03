const Contact = require("./Contact.js")
const ContactInfo = require("./ContactInfo.js")

class User {
    static allUsers = []
    static ID = 0
    constructor(fullName, isAdmin, gender, age) {
        this.ID = User.ID++
        this.fullName = fullName
        this.isAdmin = isAdmin
        this.gender = gender
        this.age = age
        this.contacts = []
    }
    newUser(fullName, gender, age) {
        if (typeof fullName != "string") {
            return "Invalid Name"
        }
        if (typeof gender != "string") {
            return "Invalid Gender"
        }
        if (typeof age != "number") {
            return "Invalid age"
        }
        if (!this.isAdmin) {
            return "Not Authorized"
        }
        let userObj = new User(fullName, false, gender, age)
        User.allUsers.push(userObj)
        return userObj
    }

    static newAdmin(fullName, gender, age) {
        if (typeof fullName != "string") {
            return "Invalid Name"
        }
        if (typeof gender != "string") {
            return "Invalid Gender"
        }
        if (typeof age != "number") {
            return "Invalid age"
        }
        return new User(fullName, true, gender, age)
    }
    getAllUsers() {
        if (!this.isAdmin) {
            return "Not Authorized"
        }
        return User.allUsers
    }
    static findUser(ID) {
        for (let index = 0; index < User.allUsers.length; index++) {
            if (ID == User.allUsers[index].ID) {
                console.log("User.allUsers[index]", User.allUsers[index].ID);
                return [index, true]
            }
        }
        return [-1, false]
    }
    updateUser(ID, parameter, newValue) {
        if (typeof ID != "number") {
            return "Invalid Id"
        }
        if (!this.isAdmin) {
            return "Not Authorised"
        }
        let [indexOfUser, isUserExist] = User.findUser(ID)
        if (!isUserExist) {
            return "User not found"
        }
        switch (parameter) {
            case "fullName":
                User.allUsers[indexOfUser].fullName = newValue
                return User.allUsers[indexOfUser]
            case "gender":
                User.allUsers[indexOfUser].gender = newValue
                return User.allUsers[indexOfUser]
            case "age":
                User.allUsers[indexOfUser].age = newValue
                return User.allUsers[indexOfUser]
            default:
                return "Invalid Parameter"
        }
    }
    deleteUser(ID) {
        if (typeof ID != "number") {
            return "Invalid Id"
        }
        let [indexOfUser, isUserExist] = User.findUser(ID)
        if (!isUserExist) {
            return "User not found"
        }
        User.allUsers.splice(indexOfUser, 1)
        return User.allUsers
    }
    createContact(contactName, country) {
        if (this.isAdmin) {
            return "Admin cannot create Contact"
        }
        let contactObj = new Contact(contactName, country)
        this.contacts.push(contactObj)
        return contactObj
    }
    getAllContact() {
        if (this.isAdmin) {
            return "Admin does not have Contacts"
        }
        return this.contacts
    }
    findContact(contactID) {
        for (let index = 0; index < this.contacts.length; index++) {
            if (this.contacts[index].ID == contactID) {
                return [index, true]
            }
        }
        return [-1, false]
    }
    updateContact(contactID, parameter, newValue) {
        let [indexOfContact, isContact] = this.findContact(contactID)
        if (!isContact) {
            return "Contact  does not exist"
        }
        return this.contacts[indexOfContact].updateContact(parameter, newValue)
    }
    deleteContact(contactID) {
        if (this.isAdmin) {
            return "Only user can delete contact!"
        }
        if (typeof contactID != 'number') {
            return "Invalid contactID passed!"
        }
        let [indexOfContact, isContact] = this.findContact(contactID)
        if (!isContact) {
            return "No contact found. Contact does not exist";
        }
        this.contacts.splice(indexOfContact, 1)
        return User.contacts
    }
    createContactInfo(contactID, phoneNumber, email) {
        if (this.isAdmin) {
            return "Admin cannot create Contact details"
        }
        let [indexOfContact, isContact] = this.findContact(contactID)
        if (!isContact) {
            return "User not found"
        }
        return this.contacts[indexOfContact].createContactInfo(phoneNumber, email)
    }
    getContactInfo(contactID) {
        if (this.isAdmin) {
            return "Admin do not have contact information"
        }
        let [indexOfContact, isContact] = this.findContact(contactID)
        if (!isContact) {
            return "User not found"
        }
        return this.contacts[indexOfContact].getContactInfo()
    }
    updateContactInfo(contactID,contactInfoID, parameter, newValue) {
        let [indexOfContact, isContact] = this.findContact(contactID)
        if (!isContact) {
            return "Contact  does not exist"
        }
        return this.contacts[indexOfContact].updateContactInfos(contactInfoID, parameter, newValue)
    }
    deleteContactInfo(contactID,contactInfoID) {
        if (this.isAdmin) {
            return "Only user can delete contact!"
        }
        if (typeof contactID != 'number') {
            return "Invalid contactID passed!"
        }
        let [indexOfContact, isContact] = this.findContact(contactID)
        if (!isContact) {
            return "No contact found. Contact does not exist";
        }
        return this.contacts[indexOfContact].deleteContactInfo(contactInfoID)
    }
    getUserById(ID) {
        if (!this.isAdmin) {
            return "Not Authorized"
        }
        if (typeof ID != 'number') {
            return "Invalid contactID passed!"
        }
        let [indexOfUser, isUserExist] = User.findUser(ID)
        if(!isUserExist){
            return "User Not Found"
        }
        return User.allUsers[indexOfUser]
    }
    getContactById(ID) {
        if (this.isAdmin) {
            return "Admin cannot access contacts"
        }
        if (typeof ID != 'number') {
            return "Invalid contactID passed!"
        }
        let [indexOfUser, isContactExist] = this.findContact(ID)
        if(!isContactExist){
            return "Contact Not Found"
        }
        return this.contacts[indexOfUser]
    }
    getContactInfoById(ID){
        if (this.isAdmin) {
            return "Admin cannot access contacts"
        }
        if (typeof ID != 'number') {
            return "Invalid contactID passed!"
        }
        let [indexOfUser, isContact] = this.findContact(ID)
        if(!isContact){
            return "Contact Not Found"
        }
        return this.contacts[indexOfUser].getContactInfoById(ID)
    }
}








