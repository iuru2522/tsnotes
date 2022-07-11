//conditional types


//heart of most useful programs, 
//in js values can be easily introspected
//conditional types help decribe the relation between the types of inputs and outputs.
interface Animal {
    live(): void;
}
interface Dog extends Animal {
    woof(): void;
}
//type Example1 = number
type Example1 = Dog extends Animal ? number : string;
//type Example2 = string
type Example2 = RegExp extends Animal ? number : string;


interface IdLabel {
    id: number
}

interface NameLabel {
    name: string
}

//the power of conditional types comes from using them with generics
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
    throw "unimplemented"
}
interface Idlabel {
    id: number;
}
interface NameLabel {
    name: string
}

type NameOrId<T extends number | string> = T extends number
    ? IdLabel
    : NameLabel;

function createLabl<T extends number | string>(idOrName: T): NameOrId<T> {
    throw "unimplemented"
}

//let a: NameLabel
let a = createLabl("ts");
//let b: IdLabel
let b = createLabl(2.8);
//let c: NameLabel | IdLabel
let c = createLabl(Math.random() ? "hello" : 42);


//Conditional Type Constraints

//thie error because "T" isn't know to have a property called message. !
//Type '"message"' cannot be used to index type 'T'
type Message<T> = T["message"];



type MessageOf<T extends {message: unknown}> =T["message"];
interface Email {
    message: string;
}

//type EmailMessageContents = string
type EmailMessageContents = MessageOf<Email>;


































