
/*
mesasge model
*/
export class Message {

    private subject: string = 'TEST SUBJECT';
    private text: string = 'TEST MESSAGE BODY';
    private from: string = '';
    private to: string = '';
    private cc: string = '';
    private bcc: string = '';

    constructor(from: string, to: string) {
        this.from = from;
        this.to = to;
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

    set mail_cc_list(v: string) {
        this.cc = v;
    }

    get mail_cc_list():string {
        return this.cc;
    }

    set mail_bcc_list(v: string) {
        this.bcc = v;
    }

    get mail_bcc_list():string {
        return this.bcc;
    }
}