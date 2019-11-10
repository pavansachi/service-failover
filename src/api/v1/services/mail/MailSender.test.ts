import { MailGunHandler } from "./impl/MailGunHandler";
import { IMailHandler } from "./IMailHandler";
import { MockRestService } from "../rest/impl/MockRestService";
import { SendGridHandler } from "./impl/SendGridHandler";
import { MailSender } from "./MailSender";
// var sinon = require("sinon");

describe('test for send emails and failover', () => {

  beforeEach(async () => {
    jest.setTimeout(10000)
  })

  test('mail gun - send email success', async () => {
    
    let mailGunHandler:IMailHandler = new MailGunHandler(new MockRestService(200));
    let sendGridHandler:IMailHandler = new SendGridHandler(new MockRestService(200));

    mailGunHandler.setNext(sendGridHandler);

    let sender: MailSender = new MailSender(mailGunHandler);

    const result:Boolean = await sender.send({
      data: {
        from: "xxx@gmail.com",
        to: [
          "xxx@gmail.com"
        ]
      }
    });

    expect(result).toBe(true);

  })

  test('send gun - send email success', async () => {
    
    let mailGunHandler:IMailHandler = new MailGunHandler(new MockRestService(500));
    let sendGridHandler:IMailHandler = new SendGridHandler(new MockRestService(200));

    mailGunHandler.setNext(sendGridHandler);

    let sender: MailSender = new MailSender(mailGunHandler);

    const result:Boolean = await sender.send({
      data: {
        from: "xxx@gmail.com",
        to: [
          "xxx@gmail.com"
        ]
      }
    });

    expect(result).toBe(true);

  })

  test('send email failed after failover', async () => {
    
    let mailGunHandler:IMailHandler = new MailGunHandler(new MockRestService(500));
    let sendGridHandler:IMailHandler = new SendGridHandler(new MockRestService(500));

    mailGunHandler.setNext(sendGridHandler);

    let sender: MailSender = new MailSender(mailGunHandler);

    const result:Boolean = await sender.send({
      data: {
        from: "xxx@gmail.com",
        to: [
          "xxx@gmail.com"
        ]
      }
    });

    expect(result).toBe(false);

  })

})