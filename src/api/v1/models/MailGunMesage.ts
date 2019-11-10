
/*
mail gun mesasge model
*/
export class MailGunMessage {

    private subject: string = 'TEST SUBJECT';
    private text: string = 'TEST MESSAGE BODY';
    private from: string = '';
    private to: string = '';
    private cc: string = '';
    private bcc: string = '';

    constructor(request: any) {
        this.subject = request.subject || this.subject;
        this.to = (request.to)?request.to.join(','):'';
        this.from = request.from;
        this.cc = (request.cc)?request.cc.join(','):'';
        this.bcc = (request.bcc)?request.bcc.join(','):'';
        this.text = request.text || this.text;
    }

    set Subject(v: string) {
        this.subject = v;
    }

    get Subject():string {
        return this.subject;
    }

    set From(v: string) {
        this.from = v;
    }

    get From():string {
        return this.from;
    }

    set Text(v: string) {
        this.text = v;
    }

    get Text():string {
        return this.text;
    }

    set To(v: string) {
        this.to = v;
    }

    get To():string {
        return this.to;
    }

    set CC(v: string) {
        this.cc = v;
    }

    get CC():string {
        return this.cc;
    }

    set BCC(v: string) {
        this.bcc = v;
    }

    get BCC():string {
        return this.bcc;
    }
}