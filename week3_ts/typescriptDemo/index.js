"use strict";
const helloWorld = (name) => {
    return `Hello ${name}!`;
};
console.log(helloWorld('TypeScript'));
document.querySelector('#root').innerHTML = helloWorld('TypeScript');
class Person {
    constructor(name, age, gender) {
        this.name = '';
        this.age = 0;
        this.gender = '';
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}
const toTable = (persons) => {
    const tableElement = persons.map(person => {
        return `
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${person.name}</td>
                        <td>${person.age}</td>
                        <td>${person.gender}</td>
                    </tr>
                </tbody>
            </table>
            `;
    });
    return tableElement.join('');
};
let persons = []; // Array of Person objects
const populator = (person) => {
    persons.push(person);
};
//use populator to populate persons array with 10 persons
for (let i = 0; i < 10; i++) {
    const person = new Person('person' + i, i, i % 2 ? 'male' : 'female');
    populator(person);
}
//use toTable to display persons array in the DOM
const tableContainer = document.createElement('div');
tableContainer.classList.add('table');
tableContainer.innerHTML = toTable(persons);
const btn = document.createElement('button');
let sortAsc = true;
btn.innerHTML = 'sort by asc/desc age';
btn.addEventListener('click', () => {
    persons.sort((a, b) => {
        return sortAsc
            ? a.age - b.age
            : b.age - a.age;
    });
    sortAsc = !sortAsc;
    tableContainer.innerHTML = toTable(persons);
});
document.querySelector('#root').appendChild(tableContainer);
document.querySelector('#root').appendChild(btn);
