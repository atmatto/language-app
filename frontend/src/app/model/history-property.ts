import {User} from './user';

export interface HistoryProperty {
    user: User["id"];
    timestamp: number; // TODO: What exactly is it?
}
