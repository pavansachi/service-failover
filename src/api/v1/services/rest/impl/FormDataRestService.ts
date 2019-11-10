import axios from "axios";
import { IRestService } from "../IRestService";
import logger from "../../../utils/Logger";

/*
rest service for sending mail
*/
export class FormDataRestService implements IRestService {

    private url: string = "";
    private log: any;

    constructor(url: string) {
        this.url = url;
        this.log = logger();
    }

    public formUrlEncoded(x: any) {

        return Object.keys(x).reduce((p, c) => {
            const value = x[c];
            if (value) {
                return p + `&${c}=${encodeURIComponent(x[c])}`;
            }
            return p;
         }, "");
    }

    public async post(data: any): Promise<number> {

        const username: string = process.env.MAILGUN_USER || "";
        const password: string = process.env.MAILGUN_PASSWORD || "";

        try {
        const response: any = await axios.post(
            this.url,
            this.formUrlEncoded(data),
            {
                auth: {
                    password,
                    username,
                },
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });

        this.log.info(response);

        } catch (e) {

            this.log.error(e);
            return 500;
        }

        return 200;
    }
}
