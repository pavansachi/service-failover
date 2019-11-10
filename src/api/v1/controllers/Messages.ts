import express, { Application, Request, Response, NextFunction } from 'express';
import { MailGunHandler } from '../services/mail/impl/MailGunHandler';
import { SendGunHandler } from '../services/mail/impl/SendGunHandler';
import { FormDataRestService } from '../services/rest/impl/FormDataRestService';
import { MockRestService } from '../services/rest/impl/MockRestService';
import { MailSender } from '../services/mail/MailSender';
import { MailRequest } from '../models/MailRequest';
let router = express.Router()
require('dotenv').config()

const mailAPI = process.env.MAILGUN_API;
let mailGunHandler = new MailGunHandler(new FormDataRestService(`${mailAPI}/messages`));
let sendGunHandler = new SendGunHandler(new MockRestService(200));
mailGunHandler.setNext(sendGunHandler);

let mailSender: MailSender = new MailSender(mailGunHandler);

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

router.post('/messages', validate, async(req: Request, res: Response, next: NextFunction) => {
    
  try {
      let body = req.body;

      let request:MailRequest = new MailRequest(body);

      let result: Boolean = await mailSender.send(request);

      if (result) {
          res.status(202).send("mail has been successfully sent")
      }
  } catch (e) {
      console.log("unexpected error happened", e);
      res.status(500);
  }
  finally {
      
  }

})

export default router;