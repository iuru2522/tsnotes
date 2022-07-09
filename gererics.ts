//GENERICS
//generics are one of the main tools in the toolbox box for creating reusable
//components is generics, that is being able to create a component that can work
// over a variety of types rather than a single one.
//this allows users to consume there components and use their own types.


//HELLO WORLD OF GENERICS


//without generics we would either have to give the identity function a specific type:
function indentity(arg: number): number {
    return arg;
}

//also could describe the identity function using the "any" type:

function identity(arg: any): any {
    return arg;
}

function yo_indentity<Type>(arg: Type): Type {
    return arg;
}
//let output: string
let output = yo_indentity<string>("myString");


//second way is the most common. 
//type argument inference - that is we want the compiler to set value of Type
//for us automatically based on the type of the argument we pass in


function new_indentity<Type>(arg: Type): Type {
    return arg;
}
//let out: string
let out = new_indentity("mystring")

//working with generic Type Variables

function allrigth<Type>(arg: Type): Type {
    return arg;
}

function logging<Type>(arg: Type): Type {
 //Property 'length' does not exist on type 'Type'.
    console.log(arg.length);
    return arg;
}
 //
 function log<Type>(arg: Type[]): Type[]{
    //(property) Array<Type>.length: number
    console.log(arg.length);
    return arg;
 }

 function log2<Type>(arg: Array<Type>): Array<Type> {
    //Array has a .length, so no more errors 
    console.log(arg.length);
    return arg;
 }


//GENERIC TYPES


// the type of generic functios is just like hose of non-generic functions, with the type parameters
//listed first, similarly to function declarations
function identityty<Type>(arg: Type): Type {
    return arg;
}

let myIden:<Type>(arg: Type) => Type = identityty;

// use of different name for the generic type parameter in the type, so long as the number
//of type variables and how the type variables are used line up
function ont<Type>(arg: Type): Type {
    return arg;
}

let myOnt: <Input>(arg: Input) => Input = ont;

//can also write the generic type as a call signature of an object literal type:
function alberta<Type>(arg: Type): Type {
    return arg;
}

let myOntario: {<Type>(arg: Type): Type} = alberta;

//writing first generic interface

interface GenericProvinceFn {
    <Type>(arg: Type): Type;
}

function manitoba<Type>(arg: Type): Type {
    return arg;
}
let myManitoba: GenericProvinceFn = manitoba;

//may want to move the generic parameter to be a parameter of the whole interface.
// Dictionary<string> rather than just Dictionary
//makes the type parameter visile to all the other membters of the interface
interface GenericCountryFn<Type> {
    (arg: Type): Type;
}

function country<Type>(arg: Type): Type {
    return arg;
}

let myCanada: GenericCountryFn<number> = country;

//GENERIC CLASSES

//a generic class has a similar shape to a generic interface. 
//generic classes have a generic type parameter list in angle brackets (<>) following the name of the class

// class GenericNumber<NumType>{
//     zeroValue: NumType;
//     add: (x: NumType, y: NumType) => NumType;
// }

// let myGenericNumber = new GenericNumber<number>();
// myGenericNumber.zeroValue = 0;
// myGenericNumber.add = function (x, y) {
//     return x + y
// }

class GenericNumbers<Num>{
    zeroValue: Num;
    add: (x: Num, y: Num) => Num;
}

let stringNumeric = new GenericNumbers<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y){
    return x + y;
}

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));











