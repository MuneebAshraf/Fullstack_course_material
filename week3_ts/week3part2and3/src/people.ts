import peopleData from './people.json';
import Person from './Person';

export function getPeople(): Promise<Person[]> {
    return new Promise((resolve) => {
        const people: Person[] = peopleData.map((person: any) => new Person(person.name, person.age, person.occupation));
        resolve(people);
    });
}
