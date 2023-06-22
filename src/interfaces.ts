import { Category } from './enums';

interface Book {
    id: number;
    title: string;
    category: Category;
    author: string;
    available: boolean;
    markDamaged?: DamageLogger;
    pages?: number;
}

interface DamageLogger {
    (reason: string): void;
}

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBooksPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string, bookTitle: string) => void;
}

interface TOptions {
    duration?: number;
    speed?: number;
}

interface Magazine {
    title: string;
    publisher: string;
}

interface ShelfItem {
    title: string;
}

interface LigMgrCallback {
    (err: Error | null, titles: string[] | null): void;
}

interface Callback<T> {
    (err: Error | null, data: T | null): void;
}

export { Book, DamageLogger, Person, Author, Librarian, TOptions, Magazine, ShelfItem, LigMgrCallback, Callback };

