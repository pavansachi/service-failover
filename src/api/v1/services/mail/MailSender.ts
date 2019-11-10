import { IMailHandler } from "./IMailHandler";
import { MailRequest } from "models/MailRequest";

/*
mail send helper
*/
export class MailSender {

    handler!: IMailHandler;

    constructor(handler: IMailHandler) {
        this.handler = handler;
    }

    async send(request: MailRequest): Promise<Boolean> {

        if (this.handler != null) {
            return await this.handler.send(request);
        }

        return false;
    }

}