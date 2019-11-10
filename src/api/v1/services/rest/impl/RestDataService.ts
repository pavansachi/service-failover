import axios from "axios";
import { IRestService } from "../IRestService";
import logger from "../../../utils/Logger";

/*
rest service for sending mail
*/
export class RestDataService implements IRestService {

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

    public async post(data: any, headers: any, type: string): Promise<number> {

        const username: string = process.env.MAILGUN_USER || "";
        const password: string = process.env.MAILGUN_PASSWORD || "";

        const contentData = (type && type === "form") ? this.formUrlEncoded(data): data;
        
        try {
        const response: any = await axios.post(
            this.url,
            contentData,
            {
                auth: {
                    password,
                    username,
                },
                headers: headers
            });

        this.log.debug(response)

        } catch (e) {

            this.log.error("error occured");
            return 500;
        }

        return 200;
    }
}
