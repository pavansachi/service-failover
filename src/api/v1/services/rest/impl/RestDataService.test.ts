import { RestDataService } from "./RestDataService";

test("test for form encoded params", () => {

  const svc = new RestDataService("");
  const v = svc.formUrlEncoded({from: "xxx@gmail.com", to: "xxx@gmail.com"});
  expect(v).toBe("&from=xxx%40gmail.com&to=xxx%40gmail.com");
});
