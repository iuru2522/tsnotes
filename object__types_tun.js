var writablePerson = {
    name: "Personality",
    age: 12
};
var readonlyPerson = writablePerson;
console.log(readonlyPerson.age);
writablePerson.age++;
console.log(readonlyPerson.age);
