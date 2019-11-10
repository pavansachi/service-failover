import { AbstractMailHandler } from "./AbstractMailHandler";
import { IRestService } from "services/rest/IRestService";
import { MailRequest } from "models/MailRequest";
import logger from "../../../utils/Logger";

/*
concrete handler
*/
export class SendGridHandler extends AbstractMailHandler {

    private restSvc!: IRestService;
    private log: any;

    constructor(restSvc: IRestService) {
        super();
        this.restSvc = restSvc;
        this.log = logger();
    }

    public async send(request: MailRequest): Promise<boolean> {

        const response = await this.restSvc.post(request);

        if (response === 200) {
            this.log.info("mail sent by sendgrid");
            return true;
        }

        this.log.error("send mail failed by sendgrid");
        return this.next(request);
    }
}
