const BaseError = require("./BaseError")

class UnAuthorized extends BaseError{
    constructor(specificMessage){
        super("UnAuthorized Access",401,specificMessage)
    }
}
module.exports = UnAuthorized