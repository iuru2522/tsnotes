//working with canstrained (обмеженими) values

// //common error when working with generic constraints
// function minimumlength<Type extends {length: number }>(
//     obj: Type,
//     minimum: number): Type{
//         if (obj.length >= minimum){
//             return obj;
//         }else {
// //Type '{ length: any; }' is not assignable to type 'Type'.
// //'{ length: any; }' is assignable to the constraint of type 'Type',
// //but 'Type' could be instantiated with a different subtype of constraint
// //'{ length: number; }
//             return { length: minimim}
//         }
//     }

//the problem is that the function promises to return the same kind of object as was passed in,
//not just some object matching the constraint.
// declare function minimumlength2<Type extends {length: number}>(
//     obj: Type,
//     minimum: number
// ): Type;
// //arr gets value{length: 6}
// const arr = minimumlength2([1, 2, 3], 6)
// // and crashes here because arrays have
// //a "slice" method, but not the returned object

// console.log(arr.slice(0))

//specifying type arguments

function combinedd<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

// declare function combines<Type>(arrr1: Type[], arrr2: Type[]): Type[]
// //normally it would be an error to call this function with mismathed arrays:
// //Type 'string' is not assignable to type 'number'
// const arrr = combines([1, 2, 3], ["hello"])

// if needed the intended type argument in a generic call you could manually specify Type:
declare function combinee<Type>(arr1: Type[], arr2: Type[]): Type[];
const aqq = combinee<string | number>([1, 2, 3], ["hello"]);

//Guidelines for Writing good genreric function

//Having too many type parameters or using constraints where they aren't needed can make inference less
//successful, frustrating callers or your function.

//push type parameters down

//two ways of writing a function that appear similar:
function firstElement10<Type>(arr: Type[]) {
  return arr[0];
}

function firstElement20<Type extends any[]>(arr: Type) {
  return arr[0];
}

//a: number (good)
const c = firstElement10([1, 2, 3]);
//b: any(bad)
const d = firstElement20([1, 2, 3]);
//RULE: When possible, use the type parameter itself rather than constraining it

//USE FEWER TYPE PARAMETERS

//another pair of similar functions
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}

function filter2<Type, Func extends (args: Type) => boolean>(
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func);
}

// TYPE PARAMETS SHOULD APPEAR TWICE

function greet<Str extends string>(s: Str) {
  console.log("Yo, " + s);
}

greet("maaan");

//easier way

//remember, type parameters are for relating the types of multiple values. If a type parameter
//is only used once in the function signature, it's not relating anything.

function greetFunc(s: string) {
  console.log("yo, " + s);
}

//RULE: If type parameter only appears in one location, strongly reconsider if you actually need it.

//OPTIONAL PARAMETERS

function fff(n: number) {
  console.log(n.toFixed()); //0 argument
  console.log(n.toFixed(3)); //3 argument
}

//also can model in TS by marking the parameter as optional with ?:
// function ff(x: number) {
//   ///
// }
// ff();
// ff(10);

//the parameter is specified as type "number", the "x" parameter will actually have the type "number | undefined"
//because unspecified parameters in JS get the value "undefined"

//can also provide a paramter default
function f100(x = 10) {
  //
}

declare function f(x?: number): void;
//all good
f();
f(10);
f(undefined);

//optional parameters in Callbacks

//after optional parameters and function type expressions, it is good to make the following
//mistakes wher writing functions that invoke callbacks;
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}

//what people usually intend when writing index? as an optional parameter
//is that they want both of these calls to be legal
declare function myForrEach(
  arr: any[],
  callback: (arg: any, index?: number) => void
): void;
myForrEach([1, 2, 3], (a) => console.log(a));
myForrEach([1, 2, 3], (a, i) => console.log(a, i));

function theFunc(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    //I don't feel like prov. index today
    callback(arr[i]);
  }
}


//In JS, if you call a function with more arguments than there are parameters,
// the extra arguments are simply ignored. 
//TS behaves the same way. Functions with fewer parameters 
//(of the same types) can always take the place of functions with more parameters.
declare function ofFunc(
  arr: any[],
  callback: (arg: any, index?: number) => void
): void;

ofFunc([1, 2, 3], (a, i) => {

  //Object is possibly 'undefined'.
  console.log(i.toFixed());
});

//Function overload

//in TS, specify function that can be called in different ways by writing overload signatures.
//to do this just write some number of function signatures(2 or more)
//followed by the body of the function.
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d)
  } else {
    return new Date(mOrTimestamp)
  }
}
const d1 = makeDate(123456789)
const d2 = makeDate(5, 5, 5)
//No overload expects 2 arguments, but overloads do exist that 
//expect either 1 or 3 arguments.
const d3 = makeDate(1, 3)

//overload signatures and the implementation signature

function fn(x: string): void;

function fn() {
  //
}

//Expected 1 arguments, but got 0
fn()

function fk(x: boolean): void
//This overload signature is not compatible with 
//its implementation signature.
function fk(x: string): void
function fk(x: boolean) {

}

//writing good overloads

function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}

//----------------------------------------------
declare function len1(s: string): number;
declare function len1(arr: any[]): number;
len1("")
len1([0])
//No overload matches this call.
//Overload 1 of 2, '(s: string): number', gave the following error.
//Argument of type 'number[] | "hello"' is not assignable to parameter of type 'string'.
//Type 'number[]' is not assignable to type 'string'.
//Overload 2 of 2, '(arr: any[]): number', gave the following error.
len1(Math.random() > 0.5 ? "hello" : [0])

function len2(x: any[] | string) {
  return x.length
}
// always prefer parameters with union types instead of 
//overloads when possible

//DECLARING "this" in a Function


//ts will infer what the "this" should be in a function via code flow analysis
// const user = {
//   id: 123,

//   admin: false,
//   becomeAdmin: function(){
//     this.Admin = true;
//   }
// }

// interface User {
//   id: number;
//   admin: boolean
// }
// declare const getDB: () => DB

// interface DB {
//   filterUsers(filter: (this: User) => boolean): User[]
// }

// const db = getDB()
// const admins = db.filterUsers(function (this: User){
//   return this.admin
// })

//---------
interface User {
  id: number;
  isAdmin: boolean;
}
declare const getDB: () => DB;
// ---cut---
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();

//this: typeof globalThis
//The containing arrow function captures the global value of 'this'.

const admins = db.filterUsers(() => this.admin);

//OTHER TYPES TO KNOW


//void
//void represents the return value of functions which don't return a value.
//it's the inferred type any time a function doesn't have any return
//any explicit value from those statements.

//void is not the same as undefined
function noop(){
  return;
}

//object

//the special type object refers to any value that isn't a primitive
//(string, number, bigInt, boolean, symbol, null or undefined).
//this is different from the empty object type { } and also 
//different from the global type "Object". It's very 
//likely people will never use Object

//object is not Object. ALWAYS use object!
//Note that in JS, func values are object, they have propetries
//Object.prototype in prototype chain, are instanceof Object, 
//can call Object.keys on them, and so on! 
//Fot this reason-> func types are considered to be object s in TS

//uknown
//the "unknown" type represents any value. This is similar to the "any"
// but is safer because it's not legal to do anything with an "uknown" value

function can(a: any) {
  a.b();//good
}
function cantwo(a: unknown) {
  //Object is of type 'unknown'.
  a.b();
}


//useful when describing function types because you 
//can describe functions that accepts any value  without having
//"any" values in your function body

declare const someRandomString: string;

function safeParse(s: string): unknown {
  return JSON.parse(s)
}

const obj = safeParse(someRandomString)
//never
//some functions never return a value

function fail(msg: string): never {
  throw new Error(msg)

}

//the "never" type represents values which are never observed. 
//in a return type, this means that the function throw an exception 
//terminates execution of the program

function fn(x: string | number){
  if(typeof x === "string"){
    //do something
  }else if(typeof x === "number"){
    //some some
  }else {
    x; //has type "never"
  }
}

//Function
//the global type "function" describes properties like "bind" 
//"call" "apply" and other present on all function values in JS
//it also has the special property that values of type
//Function can always be called, these calls return "any"
function doSomethinf(f: Function){
  return f(1, 2, 3)
}

//Rest parameters and arguments

function multiply(n: number, ...m: number[]){
  return m.map((x) => n * x );
}

const a = multiply(10, 1, 2, 3, 4)

//rest arguments

// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];
// arr1.push(...arr2);

// const args = [8, 5];
// //A spread argument must either have a tuple type or be passed 
// //to a rest parameter.(2556)
// const angle = Math.atan2(...args);

//inferred as 2-length tuple
const args = [8, 5] as const;
//OK
const angle = Math.atan2(...args);

//parameter destructuring

function sum({a, b, c}){
  console.log(a+b+c)
}
sum({a:10, b:3, c:9});

function summ({a, b, c}: {a: number; b: number; c: number}){
  console.log( a + b + c );
}

//assignability of functions

//return type void

type voidFunc = () => void;

const f1: voidFunc = () => {
  return true;
};

const f2: voidFunc = () => true;

const f3: voidFunc = function (){
  return true;
}
























