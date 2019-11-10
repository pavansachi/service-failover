import express, { NextFunction, Request, Response } from "express";
import { FormDataRestService } from "../services/rest/impl/FormDataRestService";
import { MailGunHandler } from "../services/mail/impl/MailGunHandler";
import { MailRequest } from "../models/MailRequest";
import { MailSender } from "../services/mail/MailSender";
import { MockRestService } from "../services/rest/impl/MockRestService";
import { SendGridHandler } from "../services/mail/impl/SendGridHandler";
import dotenv from "dotenv";
import logger from "../utils/Logger";

const router = express.Router();

dotenv.config();

const mailAPI = process.env.MAILGUN_API;
const mailGunHandler = new MailGunHandler(new FormDataRestService(`${mailAPI}/messages`));
const sendGridHandler = new SendGridHandler(new MockRestService(200));
mailGunHandler.setNext(sendGridHandler);

const mailSender: MailSender = new MailSender(mailGunHandler);

const log = logger();

function validate(req: Request, res: Response, next: NextFunction) {

    const fromAddress = req.body.mail_from;
    const toAddress: string[] = req.body.mail_to || [];

    if (!fromAddress) {
        log.error("mail_from is required");
        return res.sendStatus(400);
    }

    if (toAddress.length === 0) {
        log.error("mail_to is required");
        return res.sendStatus(400);
    }

    next();
}

router.post("/messages", validate, async ( req: Request, res: Response, next: NextFunction) => {
  try {
      const body = req.body;

      const request: MailRequest = new MailRequest(body);

      const result: boolean = await mailSender.send(request);

      if (result) {
          res.status(202).send("mail has been successfully sent");
      }
  } catch (e) {
    log.error("unexpected error happened", e);
      res.status(500);
  }

});

export default router;

