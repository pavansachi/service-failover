import { IMailHandler } from "../IMailHandler";
import { MailRequest } from "models/MailRequest";

/*
abstract handler to manage the failover
*/
export abstract class AbstractMailHandler implements IMailHandler {

    private handler!: IMailHandler;

    public setNext(handler: IMailHandler): void {
        this.handler = handler;
    }

    public abstract send(request: MailRequest): Promise<boolean>;

    public async next(request: MailRequest): Promise<boolean> {

        if (this.handler != null) {
            return this.handler.send(request);
        }

        return false;
    }

}
