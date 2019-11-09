import { IRestService } from "../IRestService";
import axios from "axios";

/*
rest service for sending mail
*/
export class FormDataRestService implements IRestService {
    
    url: string = '';

    constructor(url: string) {
        this.url = url
    }
    
    formUrlEncoded(x: any) {

        return Object.keys(x).reduce((p, c) => { 
            let value = x[c];
            if (value) {
                return p + `&${c}=${encodeURIComponent(x[c])}`;
            }
            return p;
         }, '')
    }

    async post(data: any): Promise<Number> {
        
        let username: string = process.env.MAILGUN_USER || '';
        let password: string = process.env.MAILGUN_PASSWORD || '';

        console.log(this.formUrlEncoded(data));

        try {
        let response: any = await axios.post(
            this.url,
            this.formUrlEncoded(data),
            {
                auth: {
                    username: username,
                    password: password
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
           
        } catch (e) {

            console.log(e.response.status)
            console.log(e.response.statusText)
            console.log(e.response.data);
            return 500
        }

        return 200;
    }
}