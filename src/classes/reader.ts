import { Book } from "../interfaces";

export class Reader {
    name: string = '';
    books: Book[] = [];
    takeBook(book: Book): void {
        this.books.push(book);
    }
}