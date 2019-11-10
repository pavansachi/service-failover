import { AbstractMailHandler } from "./AbstractMailHandler";
import { IRestService } from "services/rest/IRestService";
import { MailGunMessage } from "../../../models/MailGunMesage";
import { MailRequest } from "../../../models/MailRequest";
import logger from "../../../utils/Logger";

/*
concrete handler
*/
export class MailGunHandler extends AbstractMailHandler {

    private restSvc!: IRestService;
    private log: any;

    constructor(restSvc: IRestService) {
        super();
        this.restSvc = restSvc;
        this.log = logger()
    }

    public async send(request: MailRequest): Promise<boolean> {

        const message: MailGunMessage = new MailGunMessage(request.data);

        this.log.info(JSON.stringify(message));

        const response = await this.restSvc.post(message, { "Content-Type": "application/x-www-form-urlencoded" }, "form");

        if (response === 200) {
            this.log.info("mail sent by mailgun");
            return true;
        }

        this.log.error("send mail failed by mailgun");
        return this.next(request);
    }
}
