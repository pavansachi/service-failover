
/*
interface for rest service
*/
export interface IRestService {

    /*
        post
    */
    post(data: any, headers: any): Promise<number>;

    /*
    post with authentication
    */
    postWithAuth(auth: {username: string, password: string}, data: any, headers: any): Promise<number>;
}
