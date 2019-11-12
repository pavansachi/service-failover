import { IRetryService } from "../IRetryService";
import { IMailHandler } from "services/mail/IMailHandler";

export class RetryService implements IRetryService {
    
    retry(handler: IMailHandler, count: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}
