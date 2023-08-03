const Contact = require("./Contact.js")
const Validation=require("./Error/Validation.js")
const UnAuthorized=require("./Error/UnAuthorized.js")
const NotFound=require("./Error/NotFound.js")

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
    try{
        if (typeof fullName != "string") {
            throw new Validation("Not a String Value")
        }
        if (typeof gender != "string") {
            throw new Validation("Not a String Value")
        }
        if (typeof age != "number") {
            throw new Validation("Not an Integer Value")
        }
        if (!this.isAdmin) {
            throw new UnAuthorized("Not an Admin")
        }
        let userObj = new User(fullName, false, gender, age)
        User.allUsers.push(userObj)
        return userObj
    }
    catch(e){
        console.log(e)
    }

    }

    static newAdmin(fullName, gender, age) {
    try{
        if (typeof fullName != "string") {
            throw new Validation("Not a String Value")
        }
        if (typeof gender != "string") {
            throw new Validation("Not a String Value")
        }
        if (typeof age != "number") {
            throw new Validation("Not an Integer Value")
        }
        return new User(fullName, true, gender, age)
    }
    catch(e){
        console.log(e)
    }

    }
    getAllUsers() {
    try{
        if (!this.isAdmin) {
            throw new UnAuthorized("Not an Admin")
        }
        return User.allUsers
    }
    catch(e){
        console.log(e)
    }
    }
    static findUser(ID) {
    try{
        if (typeof ID != "number") {
            throw new Validation("Not an Integer Value")
        } 
        for (let index = 0; index < User.allUsers.length; index++) {
            if (ID == User.allUsers[index].ID) {
                console.log("User.allUsers[index]", User.allUsers[index].ID);
                return index
            }
        }
        throw new NotFound("ID not Found")
    }
    catch(e){
        console.log(e)
    }
    }
    updateUser(ID, parameter, newValue) {
    try{
        if (typeof ID != "number") {
            throw new Validation("Not an Integer Value")
        }
        if(typeof parameter!="string"){
            throw new Validation("Not a String Value")
        }
        if (!this.isAdmin) {
            throw new UnAuthorized("Not an Admin")
        }
        let indexOfUser = User.findUser(ID)
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
                throw new Validation("Not a Valid Parameter")
        }
    }
    catch(e){
        console.log(e)
    }
    }
    deleteUser(ID) {
    try{
            if (typeof ID != "number") {
                throw new Validation("Not an Integer Value")
            }
        let indexOfUser = User.findUser(ID)
        User.allUsers.splice(indexOfUser, 1)
        return User.allUsers
    }
    catch(e){
        console.log(e)
    }
    }
    createContact(contactName, country) {
    try{
        if (typeof contactName != "string") {
            throw new Validation("Not a String Value")
        }
        if (typeof country != "string") {
            throw new Validation("Not a String Value")
        }  
        if (this.isAdmin) {
            throw new UnAuthorized("Only User can Access this method")
        }
        let contactObj = new Contact(contactName, country)
        this.contacts.push(contactObj)
        return contactObj
    }
    catch(e){
        console.log(e)
    }
    }
    getAllContact() {
    try{
        if (this.isAdmin) {
            throw new UnAuthorized("Only User can Access this method")
        }
        return this.contacts
    }
    catch(e){
        console.log(e)
    }
    }
    findContact(contactID) {
    try{
        if(typeof contactID!="number"){
            throw new Validation("Not an Integer Value")
        }
        for (let index = 0; index < this.contacts.length; index++) {
            if (this.contacts[index].ID == contactID) {
                return [index, true]
            }
        }
        throw new NotFound("ID not Found")
    }
    catch(e){
        console.log(e)
    }
    }
    updateContact(contactID, parameter, newValue) {
    try{
        if(typeof contactID!="number"){
            throw new Validation("Not an Integer Value")
        }
        if(typeof parameter!="string"){
            throw new Validation("Not a String Value")
        }
        if(typeof newValue!="string"){
            throw new Validation("Not a String Value")
        }
        let indexOfContact = this.findContact(contactID)
        return this.contacts[indexOfContact].updateContact(parameter, newValue)
    }
    catch(e){
        console.log(e)
    }
    }
    deleteContact(contactID) {
    try{
        if (this.isAdmin) {
            throw new UnAuthorized("Only User can Access this method")
        }
        if (typeof contactID != 'number') {
            throw new Validation("Not an Integer Value")
        }
        let indexOfContact = this.findContact(contactID)
        this.contacts.splice(indexOfContact, 1)
        return User.contacts
    }
    catch(e){
        console.log(e)
    }
    }
    createContactInfo(contactID, phoneNumber, email) {
    try{
        if (this.isAdmin) {
            throw new UnAuthorized("Only User can Access this method")
        }
        if (typeof contactID != 'number') {
            throw new Validation("Not an Integer Value")
        }
        if (typeof phoneNumber != 'number') {
            throw new Validation("Not an Integer Value")
        }
        let indexOfContact = this.findContact(contactID)
        return this.contacts[indexOfContact].createContactInfo(phoneNumber, email)
    }
    catch(e){
        console.log(e)
    }
    }
    getContactInfo(contactID) {
    try{
        if (this.isAdmin) {
            throw new UnAuthorized("Only User can Access this method")
        }
        if (typeof contactID != 'number') {
            throw new Validation("Not an Integer Value")
        }
        let indexOfContact = this.findContact(contactID)
        return this.contacts[indexOfContact].getContactInfo()
    }
    catch(e){
        console.log(e)
    }
    }
    updateContactInfo(contactID,contactInfoID, parameter, newValue) {
    try{
        if (this.isAdmin) {
            throw new UnAuthorized("Only User can Access this method")
        }
        if (typeof contactID != 'number') {
            throw new Validation("Not an Integer Value")
        }
        if (typeof contactInfoID != 'number') {
            throw new Validation("Not an Integer Value")
        }
        let indexOfContact = this.findContact(contactID)
        return this.contacts[indexOfContact].updateContactInfos(contactInfoID, parameter, newValue)
    }
    catch(e){
        console.log(e)
    }
    }
    deleteContactInfo(contactID,contactInfoID) {
    try{
        if (this.isAdmin) {
            throw new UnAuthorized("Only User can Access this method")
        }
        if (typeof contactID != 'number') {
            throw new Validation("Not an Integer Value")
        }
        if (typeof contactInfoID != 'number') {
            throw new Validation("Not an Integer Value")
        }
        let indexOfContact = this.findContact(contactID)
        return this.contacts[indexOfContact].deleteContactInfo(contactInfoID)
    }
    catch(e){
        console.log(e)
    }
    }
    getUserById(ID) {
    try{
        if (!this.isAdmin) {
            throw new UnAuthorized("Only Admin can Access this method")
        }
        if (typeof ID != 'number') {
            throw new Validation("Not an Integer Value")
        }
        let indexOfUser = User.findUser(ID)
        return User.allUsers[indexOfUser]
    }
    catch(e){
        console.log(e)
    }
    }
    getContactById(ID) {
    try{
        if (this.isAdmin) {
            throw new UnAuthorized("Only User can Access this method")
        }
        if (typeof ID != 'number') {
            throw new Validation("Not an Integer Value")
        }
        let indexOfUser = this.findContact(ID)
        return this.contacts[indexOfUser]
    }
    catch(e){
        console.log(e)
    }
    }
    getContactInfoById(ID){
    try{
        if (this.isAdmin) {
            throw new UnAuthorized("Only User can Access this method")
        }
        if (typeof ID != 'number') {
            throw new Validation("Not an Integer Value")
        }
        let indexOfUser = this.findContact(ID)
        return this.contacts[indexOfUser].getContactInfoById(ID)
    }
    catch(e){
        console.log(e)
    }
    }
}








