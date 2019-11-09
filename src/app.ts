import express, { Application, Request, Response, NextFunction } from 'express';
import { MailSender } from './services/mail/MailSender';
import { Message } from './models/Message';
import bodyParser from 'body-parser';
import { MailGunHandler } from './services/mail/impl/MailGunHandler';
import { SendGunHandler } from './services/mail/impl/SendGunHandler';
import { FormDataRestService } from './services/rest/impl/FormDataRestService';
import { MockRestService } from './services/rest/impl/MockRestService';

require('dotenv').config()

const mailAPI = process.env.MAILGUN_API;
let mailGunHandler = new MailGunHandler(new FormDataRestService(`${mailAPI}/messages`));
let sendGunHandler = new SendGunHandler(new MockRestService(200));
mailGunHandler.setNext(sendGunHandler);

let mailSender: MailSender = new MailSender(mailGunHandler);

const app:Application = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json())

function validate(req: Request, res: Response, next: NextFunction) {

    let from_address = req.body.mail_from;
    let to_address: Array<string> = req.body.mail_to || [];

    if (!from_address) {
        console.log('mail_from is required')
        return res.sendStatus(400);
    }

    if (to_address.length == 0) {
        console.log('mail_to is required')
        return res.sendStatus(400);
    }

    next();
}

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.send('OK')
})

app.post('/messages', validate, async(req: Request, res: Response, next: NextFunction) => {
    
    let body = req.body;

    let from_address = body.mail_from;
    let to_address: string = body.mail_to.join(',');

    let message: Message = new Message(from_address,
        to_address);

    if (body.mail_cc) {
        message.mail_cc_list = body.mail_cc.join(',');
    }

    if (body.mail_bcc) {
        message.mail_bcc_list = body.mail_bcc.join(',');
    }

    let result: Boolean = await mailSender.send(message);

    res.send('OK')
})

app.listen(3000, () => console.log(`server running at port ${PORT}`))