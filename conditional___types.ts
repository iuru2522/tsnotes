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



type MessageOf<T extends { message: unknown }> = T["message"];
interface Email {
    message: string;
}

//type EmailMessageContents = string
type EmailMessageContents = MessageOf<Email>;

//-------------------------------------------------------------------------------
type MessageOff<T> = T extends { message: unknown } ? T["message"] : never;

interface Email {
    message: string;
}

interface Dog {
    bark(): void;
}

//type EmailMessageContentss = string
type EmailMessageContentss = MessageOff<Email>;

//type DogMessageContents = never
type DogMessageContents = MessageOff<Dog>;
//=============================================================================

//when "Flatten" is given an array type, is uses an indexed access
//with "number" to fetch out string[]'s element type.
type Flatten<T> = T extends any[] ? T[number] : T;
//extracts out the element type
//type Str = string
type Str = Flatten<string[]>
//type Num = number
type Num = Flatten<number>
//====================================================================
//inferring within condition types

type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
    ? Return
    : never;
//type Numnum = number
type Numnum = GetReturnType<() => number>;
//type Strstr = string
type Strstr = GetReturnType<(x: string) => string>;
//type Bools = boolean[]
type Bools = GetReturnType<(a: bollean, b: boolean) => boolean[]>;

declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;
//type T1 = string | number
type T1 = ReturnType<typeof stringOrNum>
//=============================================================================================
//DISTRIBUTIVE CONDITIONAL TYPES

type ToArrayto<Type> = Type extends any ? Type[] : never;

type ToArraytoto<Type> = Type extends any ? Type[] : never;
//type StrArrOrNumArr = string[] | number[]
type StrArrOrArr = ToArrayto<string> | number>;

//typically, distributivity is the desired behavior.
//to aboid that behavior just surround each side of the "extends"
//keyword with square brackets.
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
// StrArrOrNumArr is no longer a union
//type StrArrOrNumArr = (string | number)[]
type StrArrOrNumArr = ToArrayNonDist<string | number>;






















