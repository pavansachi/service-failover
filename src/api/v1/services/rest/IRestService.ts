/*
interface for rest service
*/
export interface IRestService {

    /*
    post method
    */
    post(data: any, headers: any, type?: string): Promise<number>;
}
