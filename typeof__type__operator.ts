//typeof type operator

//prints "string"
//js already has a "typeof" operator you can use in an expression context
console.log(typeof "Ya'all")

let s = "yaaa";
//let n:string
let n: typeof s;

//not so useful for basic types
type Predicate = (x: unknown) => boolean;
//type K = boolean
type K = ReturnType<Predicate>;

function f(){
    return {x: 10, y: 3};
}
//'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?
type PP = ReturnType<f>;

//remember that values and type's aren't the same thing. To refer to the type that the value f has
//use typeof!!
function fk(){
    return {x: 10, y: 3};
}

type PPP = ReturnType<typeof fk>;

//limitations

declare const msgbox: () => boolean;
//',' expected.
let shouldContinue: typeof msgbox("are you sure you want? this")

//Indexed Access Types

//use an indexed access type to look up a specific property on another type:

type Persona = {age: number; name: string; alive: boolean};
//type Age = number
type Age = Persona["age"];

//the indexing type is itself a typa, so can be use unions, keyof, or other types entirely:

//type I1 = string | number
type I1 = Persona["age" | "name"];
//type I2 = string | number | boolean
type I2 = Persona[keyof Persona];
type AliveOrName = "alive" | "name";
//type I3 = string | boolean
type I3 = Persona[AliveOrName];

//Error if trying to index a property that doesn't exist
//Property 'alve' does not exist on type 'Persona'.
type I1 = Persona["alve"];

const MyArray = [
    {name: "Alice", age: 15},
    {name: "Bob", age: 14},
    {name: "Clark", age: 40},
];
//type Person = {name: string; age: number;}
type Person = typeof MyArray[number];
//type Age = number
type Age = typeof MyArray[number]["age"];
//type Age2 = number
type Age2 = Person["age"];


const key = "age";
//Type 'key' cannot be used as an index type.
//'key' refers to a value, but is being used as a type here. Did you mean 'typeof key'?
type Age = Person[key];

//can use type alias for a similar style or refactor
type key2 = "age";
type Age = Person[key];







































