import { IRestService } from "../IRestService";

export class MockRestService implements IRestService {

    private result: number = 500;

    constructor(result: number) {
        this.result = result;
    }

    public post(formData: any): Promise<number> {

        return new Promise( (resolve, reject) => {
            setTimeout( () => {
                resolve(this.result);
            }, 3000);
        });
    }
}
