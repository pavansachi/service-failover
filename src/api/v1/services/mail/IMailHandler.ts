import { MailRequest } from "models/MailRequest";

/*
interface for mail handler
*/
export interface IMailHandler {

    /*
    set next handler, if send fails
    */
    setNext(handler: IMailHandler): void;

    /*
    send message
    */
    send(request: MailRequest): Promise<boolean>;
}
