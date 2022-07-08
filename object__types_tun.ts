interface Person {
    name: string;
    age: number;
}

interface ReadonlyPerson{
    readonly name: string;
    readonly age: number;
}

let writablePerson: Person = {
    name: "Personality",
    age: 12,
};
let readonlyPerson: ReadonlyPerson = writablePerson;
console.log(readonlyPerson.age);
writablePerson.age++
console.log(readonlyPerson.age)