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

interface Mac{
    contents: any;
}

let x: Mac{
    contents: "yoyo",
};
// we could check 'x.contents'
if(typeof x.contents === "string"){
    console.log(x.contents.toLowerCase())
}
// or we could use a type assertion
console.log((x.contents as string).toLowerCase())


//one type safe approach would be to instead scaffold out different
//"Box" types for every type of "contents"

interface NumberBox {
    contents: number;
}

interface StringBox {
    contents: string;
}

interface BooleanBox{
    content: boolean;
}

//but that means we'll have to create different functions or overloads
//of functions, to operate

//that's a lot of boilerplate.
//instead -> make a generic "Box" type which declares a type parameter
function setContents(box: StringBox, newContents: string): void;
function setContents(box: NumberBox, newContents: number): void;
function setContents(box: BooleanBox, newContents: boolean): void;
function setContents(box: { contents: any}, newContents: any){
    box.contents = newContents;
}

interface Boxx<Type>{
    contents: Type;
}
//Type 'Box' is not generic.
// let box: Box<string>
let box: Boxx<string>

//-----------------------------------------------------------
interface Box2<Type>{
    contents: Type;
}

interface StringBox2 {
    contents: string;
}

let boxA: Box2<string> = { contents: "hello"};
//(property) Box2<string>.contents: string
boxA.contents;

let boxB: StringBox = { contents: "world"};
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

interface Box3<Type>{
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
function doSome(value: Array<string>){
    //
}
let maArray: string[] = ["yo", "world"];
doSome(maArray);
doSome(new Array("yo", "world"));
//------------------------------------------------------------
interface Number{}
interface String{}
interface Boolean{}
interface Symbol{}
interface Array<Type>{
    length: number;
    pop(): Type | undefined;
    push(...items: Type[]): number;
}