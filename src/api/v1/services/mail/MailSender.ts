import { IMailHandler } from "./IMailHandler";
import { Message } from "models/Message";

/*
mail send helper
*/
export class MailSender {

    handler!: IMailHandler;

    constructor(handler: IMailHandler) {
        this.handler = handler;
    }

    async send(message:Message): Promise<Boolean> {

        if (this.handler != null) {
            return await this.handler.send(message);
        }

        return false;
    }

}