/* eslint-disable no-redeclare */

import { Book, Callback, LigMgrCallback, TOptions } from './interfaces';
import { Category } from './enums';
import { BookOrUndefined, BookProperties } from './types';
import RefBook from './classes/encyclopedia';

export function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

export function getAllBooks(): readonly Book[] {
    return <const>[
        { id: 1, title: 'Refactoring JavaScript', category: Category.JavaScript, author: 'Evan Burchard', available: true},
        { id: 2, title: 'JavaScript Testing', category: Category.JavaScript, author: 'Liang Yuxian Eugene', available: false },
        { id: 3, title: 'CSS Secrets', category: Category.CSS, author: 'Lea Verou', available: true },
        { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', category: Category.JavaScript, author: 'Andrea Chiarelli', available: true }
    ];
}

export function logFirstAvailable(booksCollection: readonly Book[] = getAllBooks()): void {
    console.log('number of books in the array', booksCollection.length);
    const firstAvailableBookTitle: string = booksCollection.find(book => book.available)?.title;
    console.log('title of the first available book', firstAvailableBookTitle);
}

export function getBookTitleByCategory(category: Category = Category.JavaScript): Array<string> {
    const books = getAllBooks();
    return books.filter(book => book.category === category).map(book => book.title);
}

export function logBookTitles(titles: string[]): void {
    console.log(titles);
}

export function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks();
    const { title, author } = books[index] || {};
    return [title, author];
}

export function calcTotalPages() {
    const data = <const>[
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
    ];
    return data.reduce((acc: bigint, object) => {
        return acc + BigInt(object.books) * BigInt(object.avgPagesPerBook);
    }, 0n);
}

export function createCustomerID(name: string, id: number): string {
    return `${name}-${id}`;
}

export function createCustomer(name: string, age?: number, city?: string): void {
    console.log('Customer name', name);
    age && console.log('Customer age', age);
    city && console.log('Customer city', city);
}

export function getBookByID(id: Book['id']): BookOrUndefined {
    const books = getAllBooks();

    return books.find(book => book.id === id);
}

export function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log('Customer', customer);

    return bookIDs.map(id => getBookByID(id))
        .filter(book => book.available)
        .map(book => book.title);
}

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...args: [string | boolean] | [number, boolean]): string[] {
    const books = getAllBooks();

    if(args.length === 1) {
        const [argument] = args;

        if (typeof argument === 'string') {
            return books.filter(book => book.author === argument).map(book => book.title);
        } else if (typeof arguments === 'boolean') {
            return books.filter(book => book.available === argument).map(book => book.title);
        }
    } else if (arguments.length === 2) {
        const [id, available] = arguments;

        if (typeof id === 'number' && typeof available === 'boolean') {
            return books.filter(book => book.id === id && book.available === available).map(book => book.title);
        }
    }

    return [];
}

export function assertStringValue(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('value should have be a string');
    }
}

export function bookTitleTransform(title: any): string {
    assertStringValue(title);
    return [...title].reverse().join('');
}

export function printBook(book: Book): void {
    console.log(book.title + 'by' + book.author);
}

export function getProperty(book: Book, property: BookProperties | 'isbn'): any {
    const propertyValue = book[property];

    return typeof propertyValue === 'function' ? propertyValue.name : propertyValue;
}

export function setDefaultConfig(options: TOptions): TOptions {
    options.duration ??= 100;
    options.speed ??= 70;

    return options;
}

export function assertRefBookInstance(condition: any): asserts condition {
    if(!condition) {
        throw new Error('It is not an Instance of RefBook');
    }
}

export function printRefBook(data: any): void {
    assertRefBookInstance(data instanceof RefBook);
    data.printItem();
}

export function purge<T>(inventory: Array<T>): Array<T> {
    return inventory.slice(2);
}

export function getObjectProperty<TObject extends object, TKey extends keyof TObject>(book: Book, property: BookProperties | 'isbn'): TObject[TKey] | string {
    const propertyValue = book[property];

    return typeof propertyValue === 'function' ? propertyValue.name : propertyValue;
}
type Result<T> = T extends true ? string : number;
export function update<T extends boolean>(isStringOutput: T): Result<T> {
    if (isStringOutput) {
        return 'String' as Result<T>;
    } else {
        return 123 as Result<T>;
    }
}

export function getBooksByCategory(category: Category, callback: LigMgrCallback): void {
    setTimeout(() => {
        try {
            const titles = getBookTitleByCategory(category);
            if (titles.length > 0) {
                callback(null, titles);
            } else {
                throw new Error('No books found');
            }
        } catch (error) {
            callback(error, null);
        }
    }, 2000);
}

export function logCategorySearch(err: Error | null, titles: string[] | null): void {
    if (err) {
        console.log(err.message);
    } else {
        console.log(titles);
    }
}

export function getBookByCategoryPromise(category: Category): Promise<string[]> {
    const promise: Promise<string[]> = new Promise((resolve, reject) => {
        setTimeout(() => {
            const titles = getBookTitleByCategory(category);
            if (titles.length > 0) {
                resolve(titles);
            } else {
                reject('No books found');
            }
        }, 2000);
    });

    return promise;
}

export async function logSearchResults(category: Category) {
    const bookTitles = await getBookByCategoryPromise(category);
    console.log(bookTitles.length);
}