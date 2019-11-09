import { AbstractMailHandler } from "./AbstractMailHandler";
import { IRestService } from "services/rest/IRestService";
import { Message } from "models/Message";

/*
concrete handler
*/
export class SendGunHandler extends AbstractMailHandler {

    private restSvc!: IRestService;
    
    constructor(restSvc: IRestService) {
        super();
        this.restSvc = restSvc;
    }

    async send(message: Message): Promise<Boolean> {

        let response = await this.restSvc.post({});

        if (response == 200) {
            console.log('mail sent by sendgun')
            return true;
        } 
        
        console.log('send mail failed by sendgun')
        return this.next(message);
    }
}