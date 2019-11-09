import { MailGunHandler } from "./impl/MailGunHandler";
import { IMailHandler } from "./IMailHandler";
import { MockRestService } from "../rest/impl/MockRestService";
import { Message } from "../../models/Message";
import { SendGunHandler } from "./impl/SendGunHandler";
import { MailSender } from "./MailSender";
// var sinon = require("sinon");

describe('test for send emails and failover', () => {

beforeEach(async () => {
  jest.setTimeout(10000)
})

test('mail gun - send email success', async () => {
  
  let mailGunHandler:IMailHandler = new MailGunHandler(new MockRestService(200));
  let sendGunHandler:IMailHandler = new SendGunHandler(new MockRestService(200));

  mailGunHandler.setNext(sendGunHandler);

  let sender: MailSender = new MailSender(mailGunHandler);

  const result:Boolean = await sender.send(new Message('xxx@gmail.com', 'xxx@gmail.com'));

  expect(result).toBe(true);

})

test('send gun - send email success', async () => {
  
  let mailGunHandler:IMailHandler = new MailGunHandler(new MockRestService(500));
  let sendGunHandler:IMailHandler = new SendGunHandler(new MockRestService(200));

  mailGunHandler.setNext(sendGunHandler);

  let sender: MailSender = new MailSender(mailGunHandler);

  const result:Boolean = await sender.send(new Message('xxx@gmail.com', 'xxx@gmail.com'));

  expect(result).toBe(true);

})

})