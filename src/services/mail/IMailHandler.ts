import { Message } from "models/Message";
import { IRetryService } from "services/retry/IRetryService";
import { IRestService } from "services/rest/IRestService";

/*
interface for mail handler
*/
export interface IMailHandler {

    setRetry(retryService: IRetryService): void;

    /*
    set next handler, if send fails
    */
    setNext(handler: IMailHandler): void;

    /*
    send message
    */
    send(message: Message): Promise<Boolean>;
}