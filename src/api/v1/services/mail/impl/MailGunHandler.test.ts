import { MailGunMessage } from "../../../models/MailGunMesage";
// var sinon = require("sinon");

describe("test for mail gun email provider", () => {

  beforeEach(async () => {
    jest.setTimeout(10000);
  });

  test("check for format of request", async () => {

    const message: MailGunMessage = new MailGunMessage({
      mail_from: "xxx@gmail.com",
      mail_to: [
        "xxx@gmail.com",
        "yyy@gmail.com"
      ]
    });

    expect(message.Data).toEqual({
       "from": "xxx@gmail.com",
       "to": "xxx@gmail.com,yyy@gmail.com"
    });

  });

});
