import { RestDataService } from "./RestDataService";
import axios from "axios";
import { MailGunHandler } from "../../../services/mail/impl/MailGunHandler";
import { MockRestService } from "./MockRestService";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('tests for rest data services', () => {

  test("test for form encoded params", async () => {

    const svc = new MailGunHandler(new MockRestService(200));
    const v = await svc.formUrlEncoded({from: "xxx@gmail.com", to: "xxx@gmail.com"});
    expect(v).toBe("&from=xxx%40gmail.com&to=xxx%40gmail.com");
  });
  
  test("makes a form request and fetches data from api", async () => {
  
    // setup mock
    mockedAxios.post.mockResolvedValue({status: 200});
  
    const data = await new RestDataService("https://api.sendgrid.com/v3/mail")
    .postWithAuth({
      username: "api",
      password: "xxxxxxxxxxxxx"
    },
      "&from=xxx%40gmail.com&to=xxx%40gmail.com&subject=test%20subject&cc=&bcc=&text=test%20text",
      { 
        "Content-Type": "application/x-www-form-urlencoded" 
      }
    );

    expect(data).toEqual(200);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      "https://api.sendgrid.com/v3/mail",
      "&from=xxx%40gmail.com&to=xxx%40gmail.com&subject=test%20subject&cc=&bcc=&text=test%20text",
      {
        auth: {
          username: "api",
          password: "xxxxxxxxxxxxx"
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      }
    );
  });

  test("makes a json request and fetches data from api", async () => {
  
    // setup mock
    mockedAxios.post.mockResolvedValue({status: 200});
  
    const data = await new RestDataService("https://api.mailgun.net/v3/messages")
    .post(
      {
        "personalizations":[
          {"to":[{"email":"xxx@gmail.com"}]},
          {"from":{"email":"xxx@gmail.com"}},
          {"subject": "test subject"},
          {"content":[{"type":"text/plain"}]}
        ]
      },
      { 
        "Content-Type": "application/json",
        "Authorization": "Bearer xxxxxx" 
      }
    );

    expect(data).toEqual(200);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      "https://api.mailgun.net/v3/messages",
      {
        "personalizations":[
          {"to":[{"email":"xxx@gmail.com"}]},
          {"from":{"email":"xxx@gmail.com"}},
          {"subject": "test subject"},
          {"content":[{"type":"text/plain"}]}
        ]
      },
      {
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer xxxxxx" 
        },
      }
    );
  });

});