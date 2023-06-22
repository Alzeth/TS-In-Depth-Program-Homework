import { timeout } from '../decorators';

export abstract class ReferenceItem {
    // title: string;
    // year: number;
    //
    // constructor(newTitle: string, newYear: number) {
    //     console.log('Creating a new ReferenceItem');
    //
    //     this.title = newTitle;
    //     this.year = newYear;
    // }
    private _publisher: string;
    #id: number;
    static department: string = 'Science';
    get publisher() {
        // eslint-disable-next-line no-underscore-dangle
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
        // eslint-disable-next-line no-underscore-dangle
        this._publisher = newPublisher;
    }

    constructor(public title: string, protected year: number, id: number) {
        this.#id = id;
    }

    @timeout(5000)
    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(`Department ${ReferenceItem.department}`);
    }

    getId() {
        return this.#id;
    }

    abstract printCitation(): void;
}