
export function freeze(param: string) {
    return function (constructor: Function): void {
        console.log(`Freesing the constructor ${param}`);

        Object.freeze(constructor);
        Object.freeze(constructor.prototype);
    };
}

export function logger<TFunction extends Function>(constructor: TFunction): TFunction {
    const newConstructor: Function = function() {
        console.log('Creating new instance');
        console.log(constructor.name);

        this.age = 30;
    };

    newConstructor.prototype = Object.create(constructor.prototype);

    newConstructor.prototype.printLibrarian = function (): void {
        console.log(`Librarian name: ${this.name}, Librarian age: ${this.age}`);
    };

    return newConstructor as TFunction;
}

export function writable(isWritable: boolean) {
    return function (target: Function | object, methodName: string, descriptor: PropertyDescriptor): void {
        descriptor.writable = isWritable;
    };
}

export function timeout(time: number) {
    return function (target: Function | object, methodName: string, descriptor: PropertyDescriptor): void {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: unknown[]) {
            if(window.confirm('Are you sure?')) {
                setTimeout(() => {
                    originalMethod.apply(this, args);
                }, time);
            }
        };
    };
}

export function logParameter(target: Function | object, methodName: string, index: number): void {
    const key = `${methodName}_decor_params_indexes`;
    const proto = typeof target === 'function' ? target.prototype : target;

    (proto[key] ??= []).push(index);
}

export function logMethod(target: Function | object, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
        const key = `${methodName}_decor_params_indexes`;
        const proto = typeof target === 'function' ? target.prototype : target;
        const indexes = proto[key];

        if (Array.isArray(indexes)) {
            args.forEach((argument, index) => {
                if(indexes.includes(index)) {
                    console.log(`Method: ${methodName}, ParamIndex: ${index}, ParamValue: ${argument}`);
                }
            });
        }

        return originalMethod.apply(this, args);
    };

    return descriptor;
}

export function makeProperty<T>(
    prototype: any,
    propertyName: string,
    getTransformer?: (value: any) => T,
    setTransformer?: (value: any) => T
) {
    const values = new Map<any, T>();

    Object.defineProperty(prototype, propertyName, {
        set(firstValue: any) {
            Object.defineProperty(this, propertyName, {
                get() {
                    if (getTransformer) {
                        return getTransformer(values.get(this));
                    } else {
                        values.get(this);
                    }
                },
                set(value: any) {
                    if (setTransformer) {
                        values.set(this, setTransformer(value));
                    } else {
                        values.set(this, value);
                    }
                },
                enumerable: true
            });
            this[propertyName] = firstValue;
        },
        enumerable: true,
        configurable: true
    });
}

export function format(pref: string = 'Mr./Mrs.') {
    return function (target: Function | object, propertyName: string) {
        makeProperty(target, propertyName, value => `${pref} ${value}`, value => value);
    };
}

export function positiveInteger(target: Function | object, propertyName: string, descriptor: PropertyDescriptor) {
    const originalSet = descriptor.set;

    descriptor.set = function (value: number) {
        if (value < 1 || !Number.isInteger(value)) {
            throw new Error('Invalid value');
        }

        if (originalSet) {
            originalSet.call(this, value);
        }
    };
}