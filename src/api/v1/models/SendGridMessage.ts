
/*
mail gun mesasge model
*/
export class SendGridMessage {

    private personalizations: any;

    constructor(request: any) {

        this.personalizations = [];

        const emails = request.mail_to.map((e: any) => ( {"email": e} ));

        const to = {
            "to": emails
        }

        const from = {
            "from": { "email": request.mail_from }
        }

        const subject = { "subject": request.subject };

        const content = {
            "content": [
                {
                    "type": "text/plain",
                    "value": request.text
                }
            ]
        }

        this.personalizations.push(to);
        this.personalizations.push(from);
        this.personalizations.push(subject);
        this.personalizations.push(content);
    }
}

