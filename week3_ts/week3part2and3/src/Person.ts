export default class Person {
    name: string;
    age: number;
    occupation: string;
    private _salary: number;

    constructor(name: string, age: number, occupation: string) {
        this.name = name;
        this.age = age;
        this.occupation = occupation;
        this._salary = 0;
    }

    introduce(): string {
        return `Hello, my name is ${this.name} and I am a ${this.occupation}. I earn ${this._salary}$`;
    }

    incrementAge(): void {
        this.age += 1;
    }

    setSalary(amount: number): void {
        this._salary = amount;
    }

    getSalary(): number {
        return this._salary;
    }
}
