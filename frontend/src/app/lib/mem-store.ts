import {Subject} from 'rxjs';

// Union of all properties of Class which contain values of Type.
// If A satisfies PropertyOfType<C, T> then C[A] is of type T.
type PropertyOfType<Class, Type> = {
    [P in keyof Class]: Class[P] extends Type ? P : never
}[keyof Class];

export class MemStore<K, V> {
    protected objs: (V | undefined)[] = [];
    protected map: Map<K, number> = new Map<K, number>();

    changed = new Subject<K>();

    protected index(key: K): number | undefined {
        return this.map.get(key);
    }

    protected indexForce(key: K): number {
        let i = this.map.get(key);
        if (i === undefined) {
            i = this.objs.push(undefined) - 1;
            this.map.set(key, i);
        }
        return i;
    }

    set(key: K, value: V): void {
        this.objs[this.indexForce(key)] = value;
        this.changed.next(key);
    }

    setMany(values: V[], keyProp: PropertyOfType<V, K>): void {
        for (let v of values) {
            this.set(<K>v[keyProp], v);
        }
    }

    get(key: K): V | undefined {
        let i = this.index(key);
        if (i === undefined)
            return undefined;
        return this.objs.at(i);
    }

    getMany(keys: K[]): V[] {
        let values: V[] = [];
        for (let k of keys) {
            let v = this.get(k);
            if (v !== undefined) {
                values.push(v);
            }
        }
        return values;
    }

    getAllKeys(): K[] {
        return [...this.map.keys()];
    }
}
