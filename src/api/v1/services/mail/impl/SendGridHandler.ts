import { AbstractMailHandler } from "./AbstractMailHandler";
import { IRestService } from "services/rest/IRestService";
import { MailRequest } from "models/MailRequest";

/*
concrete handler
*/
export class SendGridHandler extends AbstractMailHandler {

    private restSvc!: IRestService;
    
    constructor(restSvc: IRestService) {
        super();
        this.restSvc = restSvc;
    }

    async send(request: MailRequest): Promise<Boolean> {

        let response = await this.restSvc.post(request);

        if (response == 200) {
            console.log('mail sent by sendrid')
            return true;
        } 
        
        console.log('send mail failed by sendrid')
        return this.next(request);
    }
}