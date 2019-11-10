import { IRestService } from "services/rest/IRestService";
import { AbstractMailHandler } from "./AbstractMailHandler";
import { MailRequest } from "../../../models/MailRequest";
import { MailGunMessage } from "../../../models/MailGunMesage";

/*
concrete handler
*/
export class MailGunHandler extends AbstractMailHandler {

    private restSvc!: IRestService;

    constructor(restSvc: IRestService) {
        super();
        this.restSvc = restSvc;
    }
    
    async send(request: MailRequest): Promise<Boolean> {

        let message: MailGunMessage = new MailGunMessage(request.data);

        let response = await this.restSvc.post(message);

        if (response == 200) {
            console.log('mail sent by mailgun')
            return true;
        }
        
        console.log('send mail failed by mailgun')
        return this.next(request);
    }

}