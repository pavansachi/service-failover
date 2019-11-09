import { IRetryService } from "../IRetryService";

export class RetryService implements IRetryService {
    
    setRetryCount(count: Uint8Array): void {
        throw new Error("Method not implemented.");
    }    
    
    retry(handler: import("../../mail/IMailHandler").IMailHandler): Boolean {
        throw new Error("Method not implemented.");
    }

}