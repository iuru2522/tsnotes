//object types

//can be anonymous:

// function immigration(country: {name: string; abbr: string}) {
//     return "Welcome " + country.name 

// }


//named by using either an interface
// interface Country{
//     name: string;
//     abbr: string;
//     populatiom: number;

// }

// function immigration(country: Country){
//     return "Welcome " + country.name;
// }

//or a type alias.

type Country{
    name: string;
    abbr: string;
    populatiom: number;

}

function immigration(country: Country) {
    return "Welcome " + country.name;
}

//in all three examples above, we've written functions that take objects that
//contain the property "name" (which must be a "string") and 
//"population" (which must be a number)

//PROPERTY MODIFIERS

//each property in an object type can specify a couple of things: 
//the type, whether the property is optional, and wherer the property 
//can be written to.

//Optional Properties

//sometimes we dealing with objects that might have a property set.
// in those case, we can mark those properties as optional by adding
// a question mark(?) to the end of their names

interface Shape { };
declare function getShape(): Shape;

interface PaintOptions {
    shape: Shape;
    xPos?: number;
    yPos?: number;
};

// function paintShape(opts: PaintOptions){

// }

// const shape = getShape();

// paintShape({shape});
// paintShape({shape, xPos: 100});
// paintShape({shape, yPos: 100});
// paintShape({shape, yPos: 100, xPos: 100});


// //read more about strictNullChecks
// function paintShape(opts: PaintOptions){
//     //(property) PaintOptions.xPos?: number | undefined
//     let xPos = opts.xPos;
//     //(property) PaintOptions.yPos?: number | undefined
//     let yPos = opts.yPos;
// }

// function paintShape(opts: PaintOptions){
//     //let xPos: number
//     let xPos = opts.xPos === undefined ? 0 : opts.xPos;
//     //let yPos: number
//     let yPos = opts.yPos === undefined ? 0 : opts.yPos;
// }


function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
    //(parameter) xPos: number
    console.log("x coordinate at", xPos);
    //(parameter) yPos: number
    console.log("y coordinate at", yPos);
}

//note
//that there is currently no way to place type annotations within
//destructuring patterns. this is because the following syntax already
// means something different in javascript


//in an object destructuring pattern, shape: Shape means "grab the property"
// "shape" and redefine it locally as a variable named "Shape"
//likew -> xPos: number creates a variable named "mnumber" - value is base on the
//parameter
interface Iphone { }
declare function render(x: unknown);

function draw({ shape: Iphone, xPos: number = 100 }) {
    //Cannot find name 'shape'. Did you mean 'Shape'?
    render(shape);
    //Cannot find name 'xPos'.
    render(xPos);
}

//readonly Properties

interface SomeType {
    readonly prop: string;
}

function doSomething(obj: SomeType) {
    //can read from "obj.prop"
    console.log(`prop has the value '${obj.prop}'.`);
    //Cannot assign to 'prop' because it is a read-only property.
    obj.prop = "hello";
}

//using the "readonly" modifier doesn't necessarily imply that a value is
//totally immutable - or in other words, that its internal contents
//can't be changed. it just means the property itself can't be re-written to.


interface Home {
    readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
    //
    console.log(`happy bday ${home.resident.name}!`);
    home.resident.age++
}

function evict(home: Home) {
    //Cannot assign to 'resident' because it is a read-only property.
    home.resident = {
        name: "Vic Vic",
        age: 10,
    }
}

// interface Person {
//     name: string;
//     age: number;
// }

// interface ReadonlyPerson{
//     readonly name: string;
//     readonly age: number;
// }

// let writablePerson: Person = {
//     name: "Personality",
//     age: 12,
// };
// let readonlyPerson: ReadonlyPerson = writablePerson;
// console.log(readonlyPerson.age);
// writablePerson.age++
// console.log(readonlyPerson.age)

//Index Signatures

declare function getSringArray(): StringArray;

interface StringArray {
    [index: number]: string;
}

const myArray: StringArray = getSringArray();
//const secondItem: string
const secondItem = myArray[1];


//it is possible to support both type of indexers, but the 
//type returned from a numeric indexer must be subtype of the type
//returned from the string indexer.
//this is because when indexing with a number, JS actually convert
// that to a string before indexing into a "object". 
//That means that indexing with 100 (a "number") is the same thing as
//indexing with "100" (a "string") so the two need to be consistent
interface Country1 {
    name: string;
}

interface Canada extends Country1 {
    capital: string;
}

interface NotOkay {
    //'number' index type 'Country1' is not assignable to 'string' index type 'Canada'
    [x: number]: Country1;
    [x: string]: Canada;
}

interface NumberDictionary {
    [index: string]: number;
    length: number;//ok
    //Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
    name: string;
}

//properties of different types are acceptable if the index signature is a
//union of the property types

interface NumberOrStringDictionary {
    [index: string]: number | string;
    length: number;
    name: string;
}

//make index signatures "readonly" in order to prevent assignment
//to their indices

declare function getReadOnlyStringArrya(): ReadonlyStrinfArray;


interface ReadonlyStrinfArray {
    readonly [index: number]: string;
}

//you can't set "myArray[2]" because the index signature is "readonly"
let myArray1: ReadonlyStrinfArray = getReadOnlyStringArrya();
//Index signature in type 'ReadonlyStrinfArray' only permits reading.
myArray1[2] = 'Yo';

//extendind types


//its common to have types that might be more specific versions of
//other types.

// interface BasicAddress{
//     name?: string;
//     street: string;
//     city: string;
//     country: string;
//     postalCode: string;
// }

//in some situations that's enouth, but addresses often have a unit
//number associated with them if the building at an address has
//multiple units.

// interface AddressWithUnit{
//     name?: string;
//     unit: string;
//     street: string;
//     city: string;
//     country: string;
//     postalCode: string;
// }

interface BasicAddress {
    name?: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
}


//the "extends" keyword on an "interface" allows us to
//effectively copy member from other named types, and add whateeve new
//members we want.
//this can be useful for cutting down the amount of type declaration 
//boilerplate we have to write, and for signalling intent that several
//different declarations of the same property
//might be related. For example, AddressWithUnit didn't need repeat the 
//street" property
interface AddressWithUnit extends BasicAddress {
    unit: string;
}

//interface can also extend from multiple types

interface Colorful {
    color: string;

}

interface Circle {
    radius: number;
}

interface ColourfulCircle extends Colorful, Circle { }

const cc: ColourfulCircle = {
    color: "white",
    radius: 10
}

//INTERSECTION TYPES


//'interface' allowed to build new types from other types by extending them
//TS provides another construct called intersection types
//that is mainly used to combine existing object types.
interface Colorful {
    color: string;
}

interface Circle {
    radius2: string;
}

type ColorfulCircle = Colorful & Circle;

interface Kolorful {
    kolor: string;
}
interface Box {
    side: number;
}

function dr(box: Kolorful & Box) {
    console.log(`kolor was ${box.kolor}`);
    console.log(`side was ${box.side}`);
}

//Argument of type '{ kolor: string; sdie: number; }' 
//is not assignable to parameter of type 'Kolorful & Box'.
//Object literal may only specify known properties, and 
//'sdie' does not exist in type 'Kolorful & Box'

dr({ kolor: "white", side: 3 });
dr({ kolor: "yellow", sdie: 3 });


//interfaces vs intersections

//Generic Object Types

interface Mac {
    contents: any;
}

let w: Mac{
    contents: "yoyo",
};
// we could check 'x.contents'
if (typeof w.contents === "string") {
    console.log(w.contents.toLowerCase())
}
// or we could use a type assertion
console.log((w.contents as string).toLowerCase())


//one type safe approach would be to instead scaffold out different
//"Box" types for every type of "contents"

interface NumberBox {
    contents: number;
}

interface StringBox {
    contents: string;
}

interface BooleanBox {
    content: boolean;
}

//but that means we'll have to create different functions or overloads
//of functions, to operate

//that's a lot of boilerplate.
//instead -> make a generic "Box" type which declares a type parameter
function setContents(box: StringBox, newContents: string): void;
function setContents(box: NumberBox, newContents: number): void;
function setContents(box: BooleanBox, newContents: boolean): void;
function setContents(box: { contents: any }, newContents: any) {
    box.contents = newContents;
}

interface Boxx<Type> {
    contents: Type;
}
//Type 'Box' is not generic.
// let box: Box<string>
let box: Boxx<string>

//-----------------------------------------------------------
interface Box2<Type> {
    contents: Type;
}

interface StringBox2 {
    contents: string;
}

let boxA: Box2<string> = { contents: "hello" };
//(property) Box2<string>.contents: string
boxA.contents;

let boxB: StringBox = { contents: "world" };
//(property) StringBox.contents: string
boxB.contents;

//-------------------------------------------------------------


interface BOX<Type> {
    contents: Type;
}

// interface Apple {
//     //
// }
// //same as '{contents: Apple}'
// type AppleBox = BOX<Apple>

//this also means that we can avoid overloads entirely 
//by instead using generic functions

function setContents2<Type>(box: BOX<Type>, newContents: Type) {
    box.contents = newContents;
}

//it is worth noting that aliases can also be generic.
//we could have defined our new Box<Type> interface, which was

interface Box3<Type> {
    contents: Type;
}

//by using a type alias intead

type Box4<Type> = {
    contents: Type;
}

type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];
//type OneOrManyOrNull<Type> = OneOrMany<Type> | null
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
//type OneOrManyOrNullString = OneOrMany<string> | null
type OneOrManyOrNullString = OneOrManyOrNull<string>;

//The Array Type
function doSome(value: Array<string>) {
    //
}
let maArray: string[] = ["yo", "world"];
doSome(maArray);
doSome(new Array("yo", "world"));
//------------------------------------------------------------
//Arrays itself is a generic type
//generc object types are often some sort of container type that 
//work independently of the type of elements they contain. 
//It's ideal for data structures to work this way so that they'are
//re-usable across different data types.
interface Number { }
interface String { }
interface Boolean { }
interface Symbol { }
interface Arrays<Type> {
    /* 
    * gets or sets the length of the array
     */
    length: number;
    /* 
    * Removes the last element from an array and return it.
     */
    pop(): Type | undefined;
    /* 
    *Append new elements to an array, and returns the new length of the array.
     */
    push(...items: Type[]): number;
}

//THE ReadonlyArray Type

function doStuff(values: ReadonlyArray<string>) {
    //we can mutate "values"....
    const copy = values.slice();
    console.log(`The first value is ${values[0]}`);

    //..but we can't mutate "values"
    //Property 'push' does not exist on type 'readonly string[]'.
    values.push("hello");
}
//'ReadonlyArray' only refers to a type, but is being used as a value here.
new ReadonlyArray("red", "green", "blue");

//instead, we can assign regular "Array"s to "ReadonlyArray"s.

const roArray: ReadonlyArray<string> = ["red", "green", "blue"];

//TS provieds a shorthand syntax for Array<Type> with Type[]
// is also provides a shorthand syntax for 
//ReadonlyArray<Type> with readonly Type[]
function doStufff(values: readonly string[]) {
    //we can mutate "values"....
    const copy = values.slice();
    console.log(`The first value is ${values[0]}`);

    //..but we can't mutate "values"
    //Property 'push' does not exist on type 'readonly string[]'.
    values.push("hello");
}

let x: readonly string[] = [];
let y: string[] = [];

x = y;
//The type 'readonly string[]' is 'readonly' and cannot be 
//assigned to the mutable type 'string[]'.
y = x;

//Tuple Types

// type StringNumberPair = [string, number];

// function painter(pair: [string, number]) {
//     //const k: string
//     const k = pair[0];
//     //const q: number
//     const q = pair[1];
// }
// painter(["yo", 1000])


//to index past the number of elements -> get an error
function paint(pair: [string, boolean]){
    //Tuple type '[string, number]' of length '2' has no element at index '2'.
    const u = pair[2];
}

//descructure tuples using js array destructuring

function ssome( stringHash: [string, number]){
    const [inputString, hash] = stringHash;
    //const inputString: string
    console.log(inputString);
    //const hash: number
    console.log(hash)
}
// tuple types are useful in heavilt convension-based API's
//where each element's meaning is "obvious". This give flexibility 
//in whatever we want to name our variables when we destrucutre them
//
interface StringNumberPair {
    //specialized properties
    length: 2;
    0: string;
    1: number;
    slice(start?: number, end?: number): Array<string | number>;
}

type Either2dOr3d = [number, number, number?];
function setCoordinate(coord: Either2dOr3d){
    //const z: number | undefined
    const [x, y, z] = coord;

    console.log(`Provided coordinated had ${coord.length} dimensions`);
}
//tuples can also have rest elements which have to be an array/type tuple


//a tuple with a rest element has no set "length" - it only
//has a set of well-known elements in different positions.

type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number ];
type BooleanStringNumber = [...boolean[], string, number];

const a: StringNumberBooleans = ["hello", 1];
const a: StringNumberBooleans = ["yoo", 2, true];
const a: StringNumberBooleans = ["helloman", 2, true, false, false, true, true];

//
function readButtonInput(...args: [string, number, ...boolean[]]){
    const [name, version, ...input] = args;
}

//is basically equivalent to:
//this is handy when you take a variable number of arguments with a rest parameter, and you need a minimum number of elements, but you don't want to introduce intermediate variables

function readButtoninput(good: string, version: number, ...inpt: boolean[] ){}

//readonly Tuple Types

function doSomet(pair: readonly [string, number]){
    //Cannot assign to '0' because it is a read-only property.
    pair[0] = "yoyo";
}

//distanceFromOrigin never modifies its elements, but expects a mutable tuple. 
let point = [true, false] as const;
//since point's type was inferred as readonly [3,4] it won't be compatible with [number, number] since that type can't guarantee point's elements won't be mutated.
function distanceFromOrigin([x, y]:[boolean, boolean]){
    return Math.sqrt(x ** 2 + y ** 2)
}
//Argument of type 'readonly [3, 4]' is not assignable to parameter of type '[number, number]'.
//The type 'readonly [3, 4]' is 'readonly' and cannot be assigned to the mutable type '[number, number]'.
distanceFromOrigin(point)