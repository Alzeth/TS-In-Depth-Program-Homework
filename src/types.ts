import { Author, Book, Person } from './interfaces';
import { createCustomer, getBookByCategoryPromise } from './functions';

export type BookProperties = keyof Book;
export type PersonBook = Person & Book;
export type BookOrUndefined = Book | undefined;

export type BookRequiredFields = Required<Book>;
export type UpdatedBook = Partial<Book>;
export type AuthorWoEmail = Omit<Author, 'email'>;
export type CreateCustomerFunctionType = typeof createCustomer;

export type fn = (a: string, b: number, c: boolean) => symbol;
export type Param1<T> = T extends (a: infer R, b: number, c: boolean) => symbol ? R : never;
export type Param2<T> = T extends (a: string, b: infer R, c: boolean) => symbol ? R : never;
export type Param3<T> = T extends (a: string, b: number, c: infer R) => symbol ? R : never;
export type P1 = Param1<fn>;
export type P2 = Param2<fn>;
export type P3 = Param3<fn>;

export type RequiredProps<T extends object> = {
    [Prop in keyof T]: {} extends Pick<T, Prop> ? never : Prop;
}[keyof T];

export type OptionalProps<T extends object> = {
    [Prop in keyof T]: {} extends Pick<T, Prop> ? Prop : never;
}[keyof T];

export type BookRequiredProps = RequiredProps<Book>;
export type BookOptionalProps = OptionalProps<Book>;

export type RemoveProps<T extends object, TProps extends keyof T> = {
    [Prop in keyof T as Exclude<Prop, TProps>]: T[Prop];
};

export type BookRequiredPropsType = RemoveProps<Book, BookOptionalProps>;
export type BookOptionalPropsType = RemoveProps<Book, BookRequiredProps>;

export type Unpromisify<T> = T extends Promise<infer R> ? R : never;
type PromiseAlias = Unpromisify<ReturnType<typeof getBookByCategoryPromise>>;