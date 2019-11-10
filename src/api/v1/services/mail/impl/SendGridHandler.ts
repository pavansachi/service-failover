import { AbstractMailHandler } from "./AbstractMailHandler";
import { IRestService } from "services/rest/IRestService";
import { MailRequest } from "models/MailRequest";
import logger from "../../../utils/Logger";
import { SendGridMessage } from "../../../models/SendGridMessage";

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

        const message: SendGridMessage = new SendGridMessage(request.data);

        this.log.info(JSON.stringify(message));

        const sendGridKey = process.env.SENDGRID_API_KEY;

        const response = await this.restSvc.post(message, { "Content-Type": "application/json",
        "Authorization": `Bearer ${sendGridKey}` });

        if (response === 200) {
            this.log.info("mail sent by sendgrid");
            return true;
        }

        this.log.error("send mail failed by sendgrid");
        return this.next(request);
    }
}
