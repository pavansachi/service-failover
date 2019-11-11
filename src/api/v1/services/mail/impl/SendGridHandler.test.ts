import { SendGridMessage } from "../../../models/SendGridMessage";
// var sinon = require("sinon");

describe("test for send grid email provider", () => {

  beforeEach(async () => {
    jest.setTimeout(10000);
  });

  test("check for format of request", async () => {

    const message: SendGridMessage = new SendGridMessage({
      mail_from: "xxx@gmail.com",
      mail_to: [
        "xxx@gmail.com",
      ],
      subject: "test subject",
      text: "test content"
    });

    expect(message.Data).toEqual({
      personalizations:[
        {
          to:[
            {email:"xxx@gmail.com"}
          ]
        }],
      from:{
        email:"xxx@gmail.com"
      },
      subject :"test subject",
      content:[
            {
              type:"text/plain",
              value:"test content"
            }
          ]
    });
  });

});
