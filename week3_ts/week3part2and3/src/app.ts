import './style.css'
import Person from './Person'
import {getPeople} from "./people";
import {renderPeopleList} from "./peopleList";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Exerise 3 part 2/3 </h1>
    <div class="container">
    
    </div>
  </div>
`
const container = document.querySelector<HTMLDivElement>('.container');

getPeople().then(people => {
    if (container) {
        renderPeopleList(container, people);
    }
});

const john = new Person("Foo Bar", 22, "software developer");
console.log(john.introduce());
console.log(john.age);
john.incrementAge();
console.log(john.age);
john.setSalary(35000);
console.log(john.getSalary());
console.log(john.introduce());



