class ContactInfo{
    static ID=0
    constructor(phoneNumber,email){
        this.ID=ContactInfo.ID++
        this.phoneNumber=phoneNumber;
        this.email=email;
    }
    updateContactInfo(parameter, newValue) {
    try{
        switch (parameter) {
            case "phoneNumber":
                this.phoneNumber = newValue
                return this;
            case "email":
                this.email = newValue
                return this;
            default:
                throw new Validation("Not a Valid Parameter")
        }
    }
    catch(e){
        throw e
    }
    }
    
}
module.exports=ContactInfo

