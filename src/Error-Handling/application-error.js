export class ApplicationError extends Error{
    constructor(code, message){
        super(message);
        this.code = code;
    }
}