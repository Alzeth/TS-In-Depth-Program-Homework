import { ReferenceItem } from '../classes';
import { positiveInteger } from '../decorators';

export default class Encyclopedia extends ReferenceItem {
    private _copies: number;

    @positiveInteger
    get copies() {
        // eslint-disable-next-line no-underscore-dangle
        return this._copies;
    }

    set copies(value: number) {
        // eslint-disable-next-line no-underscore-dangle
        this._copies = value;
    }
    constructor(title: string, year: number, id: number, private edition: number) {
        super(title, id, year);
    }

    override printItem() {
        super.printItem();
        console.log(`Edition: ${this.edition} (${super.year})`);
    }

    override printCitation() {
        console.log(`${this.title} - ${this.year}`);
    }
}