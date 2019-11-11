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
    private auth: any;

    constructor(restSvc: IRestService) {
        super();
        this.restSvc = restSvc;
        this.log = logger()

        this.auth = {
            username: process.env.MAILGUN_USER || "",
            password: process.env.MAILGUN_PASSWORD || ""
        }
    }

    public async formUrlEncoded(message: any) {

        return Object.keys(message).reduce((p, c) => {
            const value = message[c];
            if (value) {
                return p + `&${c}=${encodeURIComponent(message[c])}`;
            }
            return p;
         }, "");
    }

    public async send(request: MailRequest): Promise<boolean> {

        const message: MailGunMessage = new MailGunMessage(request.data);

        const data: any = message.Data;

        this.log.info(JSON.stringify(data));

        const headers:any = {
            "Content-Type": "application/x-www-form-urlencoded" 
        };

        const form_data = this.formUrlEncoded(data);

        const response = await this.restSvc.postWithAuth(
            this.auth,
            form_data,
            headers);

        if (response === 200) {
            this.log.info("mail sent by mailgun");
            return true;
        }

        this.log.error("send mail failed by mailgun");
        return this.next(request);
    }
}
