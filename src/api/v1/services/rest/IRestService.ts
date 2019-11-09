/*
interface for rest service
*/
export interface IRestService {

    /*
    post method
    */
    post(formData: any): Promise<Number>;
}