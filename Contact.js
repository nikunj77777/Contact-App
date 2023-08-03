const ContactInfo = require("./ContactInfo")
const Validation=require("./Error/Validation.js")
const UnAuthorized=require("./Error/UnAuthorized.js")
const NotFound=require("./Error/NotFound.js")


class Contact {
    static ID = 0
    constructor(contactName, country){
        this.ID = Contact.ID++
        this.contactName = contactName
        this.country = country
        this.contactInfos=[]
    }

    updateContact(parameter, newValue){
    try{
        switch (parameter){
            case "contactName":
                this.contactName = newValue
                return this
            case "country": 
                this.country = newValue
                return this
            default:
                throw new Validation("Not a Valid Parameter")
        }
    }
    catch(e){
        throw e
    }
    }
    createContactInfo(phoneNumber,email){
        let contactInfoObj=new ContactInfo(phoneNumber,email)
        this.contactInfos.push(contactInfoObj)
        return contactInfoObj
    }
    getContactInfo(){
        return this.contactInfos
    }
    findContactInfo(contactID){
    try{
        for (let index = 0; index < this.contactInfos.length; index++){
            if(this.contactInfos[index].ID == contactID) {
                return index
            }
        }
        throw new NotFound("ID not Found")
    }
    catch(e){
        throw e
    }
    }
    updateContactInfos(contactInfoID,parameter,value){
    try{
        let indexOfContact=this.findContactInfo(contactInfoID)
        return this.contactInfos[indexOfContact].updateContactInfo(parameter,value)
    }
    catch(e){
        throw e
    }
    }
    deleteContactInfo(contactInfoID){
    try{
        let indexOfContact=this.findContactInfo(contactInfoID)
        this.contactInfos.splice(indexOfContact,1)
        return Contact.contactInfos
    }
    catch(e){
        throw e
    }
    }
    getContactInfoById(ID){
    try{
        let indexOfUser = this.findContactInfo(ID)
        return this.contactInfos[indexOfUser]
    }
    catch(e){
        throw e
    }
    }
}

module.exports = Contact