import { Message } from "models/Message";
import { IRestService } from "services/rest/IRestService";
import { AbstractMailHandler } from "./AbstractMailHandler";

/*
concrete handler
*/
export class MailGunHandler extends AbstractMailHandler {

    private restSvc!: IRestService;

    constructor(restSvc: IRestService) {
        super();
        this.restSvc = restSvc;
    }
    
    async send(message: Message): Promise<Boolean> {

        let response = await this.restSvc.post(message);

        if (response == 200) {
            console.log('mail sent by mailgun')
            return true;
        }
        
        console.log('send mail failed by mailgun')
        return this.next(message);
    }

}