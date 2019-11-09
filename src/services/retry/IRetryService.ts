import { IMailHandler } from "../mail/IMailHandler";

export interface IRetryService {

    setRetryCount(count: BigInteger): void;
    retry(handler: IMailHandler): Boolean;
}