import { IMailHandler } from "services/mail/IMailHandler";

/*
interface for retry service
*/
export interface IRetryService {

    retry(handler: IMailHandler, count: number): Promise<boolean>;
}
