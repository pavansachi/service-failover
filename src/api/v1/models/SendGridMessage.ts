
/*
mail gun mesasge model
*/
export class SendGridMessage {

    private personalizations: any;

    constructor(request: any) {

        this.personalizations = [];

        const emails = request.to.map((e: any) => ( {"email": e} ));

        const to = {
            "to": emails
        }

        const from = {
            "from": request.from
        }

        const subject = request.subject;

        const content = {
            "content": [
                {
                    "type": "text/plain",
                    "value": request.test
                }
            ]
        }

        this.personalizations.push(to);
        this.personalizations.push(from);
        this.personalizations.push(subject);
        this.personalizations.push(content);
    }
}

