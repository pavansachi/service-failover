/*
interface for rest service
*/
export interface IRestService {

    /*
    post method
    */
    post(data: any, type?: string): Promise<number>;
}
