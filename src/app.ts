import {
    bookTitleTransform,
    checkoutBooks,
    createCustomer,
    createCustomerID,
    getAllBooks,
    getBookAuthorByIndex,
    getBookByCategoryPromise,
    getBookByID,
    getBooksByCategory,
    getBookTitleByCategory,
    getObjectProperty,
    getProperty,
    getTitles,
    logBookTitles,
    logCategorySearch,
    logFirstAvailable,
    logSearchResults,
    printBook,
    printRefBook,
    setDefaultConfig,
    showHello
} from './functions';
import { Category } from './enums';
import { Book, DamageLogger, Librarian, Magazine, TOptions } from './interfaces';
import { type Library, RefBook, Shelf, UL } from './classes';
import { BookRequiredFields, CreateCustomerFunctionType, PersonBook, UpdatedBook } from './types';

showHello('greeting', 'TypeScript');

logFirstAvailable(getAllBooks());
logBookTitles(getBookTitleByCategory(Category.JavaScript));
getBookAuthorByIndex(2);

const myId: string = createCustomerID('Ann', 10);
console.log('myId', myId);
let idGenerator: (name: string, id: number) => string;
// idGenerator = (name: string, id: number): string => `${name}-${id}`;
idGenerator = createCustomerID;
console.log('idGenerator', idGenerator('Oleg', 123456));

createCustomer('Dmitry');
createCustomer('Dmitry', 41);
createCustomer('Dmitry', 41, 'New-York');
getBookTitleByCategory();
logFirstAvailable();
getBookByID(1);

const myBooks = checkoutBooks('Ann', 1, 2, 4);
console.log('myBooks', myBooks);

const checkedOutBooks = getTitles(false);
console.log(checkedOutBooks);

bookTitleTransform('Lord of The Rings');
bookTitleTransform(4);

getTitles(1, true);

const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    pages: 200,
    markDamaged: (reason: string) => console.log(`Damaged: ${reason}`)
};

printBook(myBook);
myBook.markDamaged('missing back cover');

const logDamage: DamageLogger = (reason: string) => console.log(`Damaged: ${reason}`);
logDamage('missing back cover');

// const favouriteAuthor: Author = {
//     name: 'Greg',
//     email: 'greg@mail.com',
//     numBooksPublished: 4
// };

const favouriteLibrarian: Librarian = {
    name: 'Tom',
    email: 'tom@gmail.com',
    department: 'Classical Literature',
    assistCustomer: (custName: string, bookTitle: string) => {
        console.log('custName', custName, 'bookTitle', bookTitle);
    }
};

const offer: any = {
    book: {
        title: 'Essential TypeScript',
    }
};

console.log(offer.magazine);
console.log(offer.magazine?.getTitle());
console.log(offer.book.getTitle?.());
console.log(offer.book.authors?.[0]);
console.log(offer.book.authors?.[0]?.name);

console.log(getProperty(myBook, 'title'));
console.log(getProperty(myBook, 'markDamaged'));
console.log(getProperty(myBook, 'isbn'));

// const ref = new ReferenceItem('Java Script', 2023, 12345);
// ref.printItem();
// ref.publisher = 'Ababbahalamaga';
// console.log(ref.publisher);
// console.log(ref.getId());

const refBook = new RefBook('TypeScript', 2023, 12346, 1);
refBook.printItem();

refBook.printCitation();
const favouriteLibrarian2: Librarian = new UL.UniversityLibrarian();
favouriteLibrarian.name = 'Oleg';
favouriteLibrarian.assistCustomer('Anton', 'Harry Potter');
console.log('favouriteLibrarian2', favouriteLibrarian2);

const personBook: PersonBook = {
    author: 'Anna',
    name: 'Anna',
    available: true,
    category: Category.TypeScript,
    email: 'anna@example.com',
    id: 1,
    title: 'Type Script'
};
console.log('personBook', personBook);

const options: TOptions = {};
setDefaultConfig(options);

printRefBook(RefBook);
const ul = new UL.UniversityLibrarian();
printRefBook(ul);

const isReader = true;

if(isReader) {
    // import('./classes')
    //     .then(m => {
    //         const reader = new m.Reader();
    //         reader.name = 'Vasya';
    //         console.log('reader', reader);
    //     })
    //     .catch(error => console.log('Error', error));

    const m = await import('./classes');
    const reader = new m.Reader();
    reader.name = 'Vasya';
    console.log('reader', reader);
}

// let library: Library = new Library();
let library: Library = {
    name: 'Library',
    id: 1,
    address: 'Kharkov'
};
console.log('library', library);

const inventory: Book[] = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }
];
//
// const inventory1 = purge(inventory);
// const inventory2 = purge([1, 2, 3]);
// console.log(inventory1);
// console.log(inventory2);
//
// const purgeNumbers = purge<number>;
// purgeNumbers([1, 2, 3, 4]);
// purgeNumbers(['1', '2', '3', '4']);
const bookShelf = new Shelf<Book>();
inventory.forEach(book => bookShelf.add(book));
console.log('First', bookShelf.getFirst().title);

const magazines: Magazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' }
];

const magazineShelf = new Shelf<Magazine>();
magazines.forEach(magazine => magazineShelf.add(magazine));
console.log('First', magazineShelf.getFirst().title);

magazines.forEach(() => magazineShelf.printTitles());
magazines.forEach(() => magazineShelf.find('Five Points'));

console.log(getObjectProperty(myBook, 'title'));

const bookRequiredFields: BookRequiredFields = {
    id: 6,
    title: 'You Don\'t Know JS Yet: Scope & Closures',
    author: 'Kyle Simpson',
    available: true,
    category: Category.JavaScript,
    pages: 270,
    markDamaged: (reason: string) => console.log(`Damaged: ${reason}`)
};
console.log('bookRequiredFields', bookRequiredFields);

const updatedBook: UpdatedBook = {
    id: 6,
    title: 'You Don\'t Know JS Yet: Scope & Closures',
    author: 'Kyle Simpson',
    category: Category.JavaScript,
};
console.log('updatedBook', updatedBook);

const params: Parameters<CreateCustomerFunctionType> = ['Oleg', 41, 'Kharkov'];
createCustomer(...params);

// Task 08.01
const ul2 = new UL.UniversityLibrarian();
const ulProto = Object.getPrototypeOf(ul2);

UL.UniversityLibrarian['a'] = 1;
ulProto['b'] = 2;

// Task 08.02
const ul3 = new UL.UniversityLibrarian();
console.log(ul3);

ul3.name = 'Fedor';
ul3['printLibrarian']();

// Task 08.03
ul3.assistFaculty = () => {};
// ul3.teachCommunity() = () => {};
// Object.getPrototypeOf(ul3).teachCommunity() = () => {};

// Task 08.04
const encyclopaedia = new RefBook('TypeScript', 1, 2023, 2);

encyclopaedia.printItem();

// Task 08.05
const ul4 = new UL.UniversityLibrarian();
ul4.assistCustomer('Vitya', 'You don\'t know JS');

// Task 08.07
refBook.copies = -10;

// Task 09.01
console.log('start');
getBooksByCategory(Category.JavaScript, logCategorySearch);
getBooksByCategory(Category.Software, logCategorySearch);
console.log('end');

console.log('start promise');
getBookByCategoryPromise(Category.JavaScript)
    .then(data => {
        console.log(data);
        return Promise.resolve(data.length);
    })
    .then(dataLength => console.log(dataLength))
    .catch(reason => console.log(reason));

getBookByCategoryPromise(Category.Software)
    .then(data => console.log(data))
    .catch(reason => console.log(reason));
console.log('end promise');

// Task 09.03
console.log('start await');
logSearchResults(Category.JavaScript);
console.log('end await');