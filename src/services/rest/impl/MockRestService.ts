import { IRestService } from "../IRestService";

export class MockRestService implements IRestService {
    
    post(formData: any): Promise<Number> {
        return new Promise( (resolve, reject) => {
            setTimeout( () => {
                resolve(this.result);
            }, 3000);
        });
    }
    
    result: Number = 500;

    constructor(result: Number) {
        this.result = result;
    }
}