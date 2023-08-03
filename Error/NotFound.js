const BaseError = require("./BaseError")

class NotFound extends BaseError{
    constructor(specificMessage){
        super("UnAuthorized Access",401,specificMessage)
    }
}
module.exports = NotFound