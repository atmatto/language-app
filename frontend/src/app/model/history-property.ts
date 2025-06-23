import {User} from './user';

export interface HistoryProperty {
    user: User["id"];
    timestamp: string;
}
