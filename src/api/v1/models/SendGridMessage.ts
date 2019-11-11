
/*
mail gun mesasge model
*/
export class SendGridMessage {

    private data: any;

    constructor(request: any) {

        this.data = {};

        if (request.mail_to) {

            const personalizations = [];
            const emails = request.mail_to.map((e: any) => ( {"email": e} ));
            const to = {
                "to": emails
            }
            personalizations.push(to);
            this.data.personalizations = personalizations;
        }

        if (request.mail_from) {
            const from = { "email": request.mail_from }
            this.data.from = from;
        }

        if (request.subject) {
            const subject = request.subject;
            this.data.subject = subject;
        }

        if (request.text) {
            const content = [
                    {
                        "type": "text/plain",
                        "value": request.text
                    }
                ]
            
            this.data.content = content;
        }
    }

    get Data(): any {
        return this.data;
    }
}

