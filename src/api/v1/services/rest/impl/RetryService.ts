import { IRetryService } from "../IRetryService";
import { IMailHandler } from "services/mail/IMailHandler";

export class RetryService implements IRetryService {
    
    count: number;

    constructor(count: number) {
        this.count = count;
    }

    retry(handler: IMailHandler): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}
