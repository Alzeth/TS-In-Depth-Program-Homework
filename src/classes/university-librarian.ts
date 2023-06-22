import * as Interfaces from '../interfaces';
import { format, freeze, logger, logMethod, logParameter, writable } from '../decorators';

@freeze('UniversityLibrarian')
@logger
export class UniversityLibrarian implements Interfaces.Librarian {
    @format() name: string;
    email: string;
    department: string;

    @logMethod
    assistCustomer(@logParameter custName: string, @logParameter bookTitle: string): void {
        console.log(`${this.name} is assisting ${custName} with the book ${bookTitle}`);
    }

    @writable(true)
    assistFaculty(): void {
        console.log('Assisting faculty');
    }

    @writable(false)
    teachCommunity(): void {
        console.log('Teaching community');
    }
}