import { IMailHandler } from "./IMailHandler";
import { MailRequest } from "models/MailRequest";

/*
mail send helper
*/
export class MailSender {

    private handler!: IMailHandler;

    constructor(handler: IMailHandler) {
        this.handler = handler;
    }

    public async send(request: MailRequest): Promise<boolean> {

        if (this.handler != null) {
            return await this.handler.send(request);
        }

        return false;
    }

}
