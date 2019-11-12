
/*
mail gun mesasge model
*/
export class SendGridMessage {

    private data: any;

    constructor(request: any) {

        this.data = {};

        this.data.personalizations = [];
        this.data.personalizations[0] = {};

        if (request.mail_to) {

            const emails = request.mail_to.map((e: any) => ( {"email": e} ));
            this.data.personalizations[0].to = emails;
        }

        if (request.mail_cc) {

            const emails = request.mail_cc.map((e: any) => ( {"email": e} ));
            this.data.personalizations[0].cc = emails;
        }

        if (request.mail_bcc) {

            const emails = request.mail_bcc.map((e: any) => ( {"email": e} ));
            this.data.personalizations[0].bcc = emails;
        }

        let subject = "TEST SUBJECT";

        if (request.subject) {
            subject = request.subject;
            this.data.subject = subject;
        }

        if (request.mail_from) {
            const from = { "email": request.mail_from }
            this.data.from = from;
        }

        let content = [
            {
                "type": "text/plain",
                "value": "TEST TEXT"
            }
        ]

        if (request.text) {
            content = [
                    {
                        "type": "text/plain",
                        "value": request.text
                    }
                ]
        }
        this.data.content = content;
    }

    get Data(): any {
        return this.data;
    }
}

