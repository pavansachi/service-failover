
/*
mail gun mesasge model
*/
export class MailGunMessage {

    private subject: string = "TEST SUBJECT";
    private text: string = "TEST MESSAGE BODY";
    private from: string = "";
    private to: string = "";
    private cc: string = "";
    private bcc: string = "";

    constructor(request: any) {
        this.subject = request.subject || this.subject;
        this.to = (request.mail_to) ? request.mail_to.join(",") : "";
        this.from = request.mail_from;
        this.cc = (request.mail_cccc) ? request.mail_cc.join(",") : "";
        this.bcc = (request.mail_bcc) ? request.mail_bcc.join(",") : "";
        this.text = request.text || this.text;
    }

    set Subject(v: string) {
        this.subject = v;
    }

    get Subject(): string {
        return this.subject;
    }

    set From(v: string) {
        this.from = v;
    }

    get From(): string {
        return this.from;
    }

    set Text(v: string) {
        this.text = v;
    }

    get Text(): string {
        return this.text;
    }

    set To(v: string) {
        this.to = v;
    }

    get To(): string {
        return this.to;
    }

    set CC(v: string) {
        this.cc = v;
    }

    get CC(): string {
        return this.cc;
    }

    set BCC(v: string) {
        this.bcc = v;
    }

    get BCC(): string {
        return this.bcc;
    }
}
