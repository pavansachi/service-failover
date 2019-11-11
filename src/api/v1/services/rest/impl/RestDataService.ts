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

    public async post(data: any, headers: any): Promise<number> {
        
        try {
            const response: any = await axios.post(
                this.url,
                data,
                {
                    headers: headers
                });

            this.log.info({
                status: response.status,
                text: response.statusText,
                headers: response.headers
            })

        } catch (e) {

            this.log.error({
                status: e.response.status,
                statusText: e.response.statusText,
                headers: e.response.headers
            });
            return 500;
        }

        return 200;
    }

    public async postWithAuth(auth: {username: string, password: string}, data: any, headers: any): Promise<number> {
        
        try {
            const response: any = await axios.post(
                this.url,
                data,
                {
                    auth,
                    headers: headers
                });

            this.log.info({
                status: response.status,
                text: response.statusText,
                headers: response.headers
            });

        } catch (e) {

            this.log.error({
                status: e.response.status,
                statusText: e.response.statusText,
                headers: e.response.headers
            });
            return 500;
        }

        return 200;
    }
}
