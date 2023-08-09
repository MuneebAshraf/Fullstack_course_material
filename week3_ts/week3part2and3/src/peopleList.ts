import Person from './Person';

export function renderPeopleList(container: HTMLDivElement, people: Person[]): void {
    people.forEach(person => {
        const personDiv = document.createElement('div');
        personDiv.className = 'person';

        const name = document.createElement('h2');
        name.className = 'person__name';
        name.textContent = person.name;

        const occupation = document.createElement('p');
        occupation.className = 'person__occupation';
        occupation.textContent = person.occupation;

        const age = document.createElement('p');
        age.className = 'person__age';
        age.textContent = person.age.toString();

        const salary = document.createElement('p');
        salary.className = 'person__salary';
        salary.textContent = person.getSalary().toString();

        personDiv.append(name, occupation, age, salary);
        container.appendChild(personDiv);
    });
}
