//function type expressions

//simple way to descrive a function is with a function type expression
// there types are syntactically similar to arrow functions

//the syntax (a: string) => void means a function with one parameter, named a,
//of type string, that doesn't have a return value.

//Note that the parameter name is required. The function type (string) => void means
// “a function with a parameter named string of type any“!
function greeter(fn: (a: string) => void) {
  fn("yo Yo");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);

//type alias to name a function type:
type myFunction = (a: string) => void;
function my(fn: myFunction) {
  //
}

//call signatures

//in js function can have properties in addtion to being callable.
//
//function type expression syntax doesn't allow for declaring properties.
//if we want to decrive somenthing callable with properties,just write a call
//signature in an object type
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};

function buildHouse(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}

//construct signatures

//js function can also be invoked with the "new" operator.
//TS refers to these as constructors because thay usually create a new object.
//you can write a consruct signature by adding the "new" keyword in front of a call
//singature

type SomeObject = any;
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}

//some objects, like JS "Date" object, can be called with or without "new"
//Just combine call and construct signatures in the same arbitrary.
interface CallOrConstruct {
  new (s: string): Date;
  (n?: number): number;
}

//generic function

//its common to write a function where the types of the input relate to the type
//of the output, or where the types of two inputs are related in some way
//
function firstElement(arr: any[]) {
  return arr[0];
}

//in TS, generics are used when we want to decrive a correspondence
//between two values. we do this by declaring a type parameter in the function
//signature
function secondElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

//by addind a type parameter "Type" to this functions and using it in two
//places, we've created a link between the input of the function (the array)
// and the output (the return value). now when we call it, a more specific
//type comes out!
declare function thirdElement<Type>(arr: Type[]): Type | undefined;

const s = thirdElement(["a", "b", "c"]);
const n = thirdElement([1, 2, 3]);
const u = thirdElement([]);

//inference(висновок)

//
//can use multiple type parameter as well.
//for ex. a standalone version of "map" would look like this:
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func);
}

//parameter "n" is of type "string"
//"parsed" is of type "number[]"
const parsed = map(["1", "2", "3"], (n) => parseInt(n));

//constraints(обмеження)

//function thar returns the longer of two values. 
//need a "length" property that's a number. 
//constrain the type parameter to that type by writting an extends clause:

function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

//longerArray is of type "number[]"
const longerArray = longest([1, 2], [1, 2. 3])
//longestString os of type "alice" | "bob"
const longestString = longest("alice", "bob");
//error! numbers don't have a "length" property

//Argument of type 'number' is not assignable to parameter of type '{ length: number; }'
const notoK = longest(10, 1000)


















































