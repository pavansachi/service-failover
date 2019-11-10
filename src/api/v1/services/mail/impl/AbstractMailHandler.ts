import { IRetryService } from "services/retry/IRetryService";
import { IMailHandler } from "../IMailHandler";
import { MailRequest } from "models/MailRequest";

/*
abstract handler to manage the failover
*/
export abstract class AbstractMailHandler implements IMailHandler {
    
    handler!: IMailHandler;

    setRetry(retryService: IRetryService): void {
        throw new Error("Method not implemented.");
    }    
    
    setNext(handler: IMailHandler): void {
        this.handler = handler;
    }   
    
    abstract send(request: MailRequest): Promise<Boolean>;

    async next(request: MailRequest): Promise<Boolean> {

        if (this.handler != null) {
            return this.handler.send(request);
        }

        return false;
    }

}