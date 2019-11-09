import { IRetryService } from "services/retry/IRetryService";
import { Message } from "models/Message";
import { IMailHandler } from "../IMailHandler";

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
    
    abstract send(message: Message): Promise<Boolean>;

    async next(message: Message): Promise<Boolean> {

        if (this.handler != null) {
            return this.handler.send(message);
        }

        return false;
    }

}