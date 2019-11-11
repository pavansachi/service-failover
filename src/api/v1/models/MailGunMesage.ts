
/*
mail gun mesasge model
*/
export class MailGunMessage {

    private data: any;

    constructor(request: any) {

        this.data = {};

        if (request.subject) {
            this.data.subject = request.subject || "TEST SUBJECT";
        }

        if (request.mail_to && request.mail_to.length > 0) {
            this.data.to = request.mail_to.join(",");
        }

        if (request.mail_from) {
            this.data.from = request.mail_from;
        }

        if (request.mail_cc && request.mail_cc.length > 0) {
            this.data.cc = request.mail_cc.join(",");
        }

        if (request.mail_bcc && request.mail_bcc.length > 0) {
            this.data.bcc = request.mail_bcc.join(",");
        }

        if (request.text) {
            this.data.text = request.text;
        }
    }

    get Data(): any {
        return this.data;
    }

    set Subject(v: string) {
        this.data.subject = v;
    }

    get Subject(): string {
        return this.data.subject;
    }

    set From(v: string) {
        this.data.from = v;
    }

    get From(): string {
        return this.data.from;
    }

    set Text(v: string) {
        this.data.text = v;
    }

    get Text(): string {
        return this.data.text;
    }

    set To(v: string) {
        this.data.to = v;
    }

    get To(): string {
        return this.data.to;
    }

    set CC(v: string) {
        this.data.cc = v;
    }

    get CC(): string {
        return this.data.cc;
    }

    set BCC(v: string) {
        this.data.bcc = v;
    }

    get BCC(): string {
        return this.data.bcc;
    }
}
