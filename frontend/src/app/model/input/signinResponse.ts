import {User} from '../user';

export interface SigninResponse {
    jwt: string;
    user: User;
}
