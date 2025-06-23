import {User} from '../user';
import {HistoryProperty} from '../history-property';
import { MemStore } from '../../lib/mem-store';

export interface HistoryPropertyDeep {
    user: User;
    timestamp: string;
}

export function hpMakeShallow(prop: HistoryPropertyDeep, cache: MemStore<User["id"], User>): HistoryProperty {
    cache.set(prop.user.id, prop.user);
    return {user: prop.user.id, timestamp: prop.timestamp};
}
