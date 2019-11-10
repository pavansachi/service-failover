import { AbstractMailHandler } from "./AbstractMailHandler";
import { IRestService } from "services/rest/IRestService";
import { MailRequest } from "models/MailRequest";

/*
concrete handler
*/
export class SendGunHandler extends AbstractMailHandler {

    private restSvc!: IRestService;
    
    constructor(restSvc: IRestService) {
        super();
        this.restSvc = restSvc;
    }

    async send(request: MailRequest): Promise<Boolean> {

        console.log("call sendgun");

        let response = await this.restSvc.post(request);

        if (response == 200) {
            console.log('mail sent by sendgun')
            return true;
        } 
        
        console.log('send mail failed by sendgun')
        return this.next(request);
    }
}