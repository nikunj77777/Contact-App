class BaseError{
    constructor(message,HTTPStatus,specificMessage){
        this.message=message;
        this.HTTPStatus=HTTPStatus;
        this.specificMessage=specificMessage;
    }
}
module.exports=BaseError