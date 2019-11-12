import express, { NextFunction, Request, Response } from "express";
import { RestDataService } from "../services/rest/impl/RestDataService";
import { MailGunHandler } from "../services/mail/impl/MailGunHandler";
import { MailRequest } from "../models/MailRequest";
import { MailSender } from "../services/mail/MailSender";
import { MockRestService } from "../services/rest/impl/MockRestService";
import { SendGridHandler } from "../services/mail/impl/SendGridHandler";
import dotenv from "dotenv";
import logger from "../utils/Logger";
const { body, validationResult } = require('express-validator');

console.log(body);

const router = express.Router();

dotenv.config();

const mailGunAPI = process.env.MAILGUN_API;
const mailSendGridAPI = process.env.SENDGRID_API;

const mailGunHandler = new MailGunHandler(new RestDataService(`${mailGunAPI}`));
const sendGridHandler = new SendGridHandler(new RestDataService(`${mailSendGridAPI}`));
mailGunHandler.setNext(sendGridHandler);

const mailSender: MailSender = new MailSender(mailGunHandler);

const log = logger();

function sendError(e: string): any {
    return {
        message: e
    }
}

router.post("/messages", [
    body('mail_from', 'Invalid email').exists().isEmail(),
    body('mail_to', 'Invalid email').exists().isEmail(),
    body('mail_cc', 'Invalid email').optional().isEmail(),
    body('mail_bcc', 'Invalid email').optional().isEmail(),
    body('subject', 'Subject should not be empty').optional().isLength({ min: 1 }),
    body('text', 'Text should not be empty').optional().isLength({ min: 1 })
], async ( req: Request, res: Response) => {
  try {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const body = req.body;
    const request: MailRequest = new MailRequest(body);
    const result: boolean = await mailSender.send(request);

    if (result) {
        res.status(202).send("mail has been successfully sent");
    }
    else {
        res.status(500).send("mail has not been sent");
    }
  } catch (e) {
    log.error("unexpected error happened", e);
    res.status(500).send("mail has not been sent");
  }

});

export default router;

