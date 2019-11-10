import { IRetryService } from "services/retry/IRetryService";
import { MailRequest } from "models/MailRequest";

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
    send(request: MailRequest): Promise<Boolean>;
}