import { FormDataRestService } from "./FormDataRestService"

test('test for form encoded params', () => {
    
  let svc = new FormDataRestService('');
  let v = svc.formUrlEncoded({from: 'xxx@gmail.com', to: 'xxx@gmail.com'});
  expect(v).toBe('&from=xxx%40gmail.com&to=xxx%40gmail.com')
})